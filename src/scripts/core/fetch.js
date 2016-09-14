import { Observable } from 'rxjs/Observable';
import { globalStore } from 'stores/';
import { identity, compose, filter, isEmpty, propEq, is, length, warn } from 'core/utils';
import 'whatwg-fetch';

const f = method => (url, data = {}) =>
  fetch(url, {
    credentials: 'include',
    method,
    ...(method === 'post' ? { headers: { 'content-type': 'application/json' } } : {}),
    ...data,
    ...(data.body && is(Object, data.body) ? { body: JSON.stringify(data.body) } : {})
  })
  .then(checkResponse)
  .then(resp => resp.json())
  .catch(e => { throw e; });

const checkResponse = resp => {
  const { status } = resp;
  if (status >= 200 && status < 300 || status === 403 || status === 401) return resp;
  throw resp;
};

// Functions used around the app to fetch
export const get = f('get');
export const post = f('post');

// Collection of observables to merge and emit request results
export const request = (fnRequest, actions, {
  retry = 2,
  immediate = () => Observable.of(globalStore.toggleLoading(true, 'Fetching')),
  unauthorized = $ => $.do(_ => { window.location.href = '/'; }),
  error = $ => $.do(({ errors }) => errors.map(({ message }) => {
    actions.ERROR$.next({ message });
  })).map(() => identity),
  success = () => identity,
  always = () => Observable.of(globalStore.toggleLoading(false, 'Fetching'))
}) => {
  const request$ = Observable.defer(fnRequest)
    .retryWhen(errors$ =>
      // Incremental back-off strategy
      Observable.zip(Observable.range(1, retry), errors$)
        .do(([ i, { response } ]) => warn(`Error fetching ${response}, retrying in ${i} second(s)`))
        .mergeMap(([ i, err ]) => {
          if (i === retry) {
            console.log(err);
            throw err.statusText;
          }
          return Observable.timer(i * 1000);
        }))
    .catch(message => Observable.of({ errors: [ { message } ] }))
    .share();

  // Filters for emitting the correct success/auth/error stream from request
  const onResponse$ = Observable.merge(
    unauthorized(request$.filter(({ errors }) => unauthorizedStatus(errors))),
    error(request$.filter(({ errors }) => errorStatus(errors))),
    success(request$.filter(({ errors }) => successStatus(errors)))
  ).filter(identity).share();

  const onImmediate$ = immediate();

  return onImmediate$ ? onImmediate$.merge(
    onImmediate$.mergeMap(() => onResponse$),
    onResponse$.mergeMap(always).filter(identity)
  ) : onResponse$;
};

// Functions to check if API response contains errors
const successStatus = isEmpty;
const unauthorizedStatus = compose(length, filter(propEq('code', 215)));
const errorStatus = (errors) => !successStatus(errors) && !unauthorizedStatus(errors);
