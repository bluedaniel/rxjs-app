import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { fromJS } from 'immutable';
import { createBrowserHistory } from 'history';
import { identity } from 'ramda';
import * as stores from 'stores/';
import { onRouteActions } from 'core/router';
import { logAction } from 'core/utils';

// Main state stream
export const state$ = new BehaviorSubject();

// Initial state
export const stateDriver = () => {
  // defaultState is the initial state of the stores
  const defaultState = Object.entries(stores).reduce((acc, [ k, v ]) =>
    ({ ...acc, [k]: v.defaultState() }), {});

  // initialStates$ is any initial observables in the store, ie fetch user on userStore
  const initialStates$ = Object.entries(stores)
    .filter(([ k, v ]) => !!v.initialState$)
    .reduce((acc, [ k, v ]) =>
      ([ ...acc, v.initialState$().map(x => ({ [k]: x })) ]), []);

  // Zip all the streams so they emit only on the last
  return Observable.zip(...initialStates$)
  .combineAll((...args) =>
    args.reduce((acc, curr) => ({ ...acc, ...curr }), defaultState))
  .map(fromJS);
};

export const behaviourDriver = (state$, behaviours) =>
  Observable.merge(
    ...Object.values(behaviours).map(fn$ =>
      fn$({ state$ }).map(fn => ({ fn, type: fn$.name }))))
  .do(({ fn, type }) => logAction({ type, payload: fn }))
  .withLatestFrom(state$, ({ fn, type }, state) =>
    fn(state)); // New state from action fn ie updateUserFn(latestState)

// History locatiom
export const history = createBrowserHistory();

export const historyDriver = (state$, guest) => {
  const history$ = Observable.create(observer =>
    history.listen(location => observer.next(location)))
  .startWith(history.location);

  return history$.withLatestFrom(state$, ({ pathname }, state) =>
    onRouteActions({ state: state.toJS(), pathname }, guest))
  .filter(identity);
};
