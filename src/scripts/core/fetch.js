import { Observable } from 'rxjs/Observable';
import { globalStore } from 'stores/';
import { identity, not, compose, filter, propOr, isEmpty, propEq, is } from 'core/utils';
import { warn } from 'core/logger';
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
  error = $ => $.do(({ errors }) => (errors || [{ message: 'fetch ¯\\_(ツ)_/¯' }])
    .map(({ message }) => { actions.ERROR$.next({ message }); }))
  .map(() => identity),
  success = () => Observable.of(identity),
  always = () => Observable.of(globalStore.toggleLoading(false, 'Fetching'))
}) => {
  const request$ = Observable.defer(fnRequest)
    .retryWhen(errors$ =>
      // Incremental back-off strategy
      Observable.zip(Observable.range(1, retry), errors$)
        .do(([ i, { response } ]) => warn(`Error fetching ${response}, retrying in ${i} second(s)`))
        .mergeMap(([ i, err ]) => {
          if (i === retry) {
            warn(err);
            throw err.statusText;
          }
          return Observable.timer(i * 1000);
        }))
    .catch(err => Observable.of({ errors: [ err ] }))
    .onErrorResumeNext();

  // Filters for emitting the correct success/auth/error stream from request
  const onResponse$ = Observable.merge(
    unauthorized(request$.filter(unauthorizedCheck)),
    error(request$.filter(errorCheck)),
    success(request$.filter(successCheck))
  ).share();

  const onImmediate$ = immediate();

  return onImmediate$ ? onImmediate$.merge(
    onImmediate$.mergeMap(() => onResponse$),
    onResponse$.mergeMap(always)
  ) : onResponse$;
};

// Functions to check if API response contains errors
const successCheck = resp => {
  const resultCheck = compose(not, isEmpty, propOr([], 'results'))(resp);
  const errorCheck = compose(isEmpty, propOr([], 'errors'))(resp);
  return resultCheck && errorCheck;
};
const unauthorizedCheck = compose(not, isEmpty, filter(propEq('code', 215)), propOr([], 'errors'));
const errorCheck = resp => !successCheck(resp) && !unauthorizedCheck(resp);
