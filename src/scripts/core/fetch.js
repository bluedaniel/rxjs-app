import { Observable } from 'rxjs/Observable';
import { identity, compose, head, pluck, isEqual, isEmpty, isObject } from 'lodash/fp';
import { globalStore } from 'stores/';
import { warn } from 'core/utils';
import 'whatwg-fetch';

const postHeaders = { headers: { 'content-type': 'application/json' } };

const check = response => {
  const { status } = response;
  if (status >= 200 && status < 300 || status === 403 || status === 401) return response;
  throw response;
};

const f = method => (url, data = {}) =>
  fetch(url, {
    credentials: 'include',
    method,
    ...(method === 'post' ? postHeaders : {}),
    ...data,
    ...(data.body && isObject(data.body) ? { body: JSON.stringify(data.body) } : {})
  })
  .then(check)
  .then(response => response.json())
  .catch(e => { throw e; });

const successStatus = ({ errors }) => isEmpty(errors);
const unauthorizedStatus = ({ errors }) => compose(isEqual(215), pluck('code'), head)(errors);
const errorStatus = ({ errors }) => {
  return !successStatus({ errors }) && !unauthorizedStatus({ errors });
};

export const get = f('get');
export const post = f('post');

export const request = (fnRequest, actions, {
  retry = 2,
  immediate = () => Observable.of(globalStore.toggleLoading(true, 'Fetching')),
  unauthorized = $ => $.do(_ => { window.location.href = '/'; }),
  error = $ => $.do(({ errors }) => errors.map(err => {
    if (!isEmpty(actions)) actions.ERROR.next(err);
  })).map(() => identity),
  success = () => identity,
  always = () => Observable.of(globalStore.toggleLoading(false, 'Fetching'))
}) => {
  const request$ = Observable.defer(fnRequest)
    .retryWhen(errors$ =>
      Observable.zip(Observable.range(1, retry), errors$)
        .do(([ i, { response } ]) => warn(`Error fetching ${response}, retrying in ${i} second(s)`))
        .mergeMap(([ i, { statusText } ]) => {
          if (i === retry) {
            throw statusText;
          }
          return Observable.timer(i * 1000);
        }))
    .catch(message => Observable.of({ errors: [ { message } ] }))
    .share();

  const onImmediate$ = immediate();
  const onResponse$ = Observable.merge(
    unauthorized(request$.filter(unauthorizedStatus)),
    error(request$.filter(errorStatus)),
    success(request$.filter(successStatus))
  ).filter(identity).share();

  return onImmediate$ ? onImmediate$.merge(
    onImmediate$.mergeMap(() => onResponse$),
    onResponse$.mergeMap(always).filter(identity)
  ) : onResponse$;
};
