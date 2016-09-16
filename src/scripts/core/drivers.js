import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { createBrowserHistory } from 'history';
import * as stores from 'stores/';
import { onRouteActions } from 'core/router';
import { identity, logAction } from 'core/utils';

// Main state stream
export const state$ = new BehaviorSubject();

// Initial state
export const stateDriver = () => {
  // defaultState is the initial state of the stores
  const defaultState = Object.entries(stores).reduce((acc, [ k, v ]) =>
    ({ ...acc, [k]: v.defaultState() }), {});

  // initialStates$ is any initial observables in the store, ie fetch user
  const initialStates$ = Object.entries(stores)
    .filter(([ k, v ]) => !!v.initialState$)
    .reduce((acc, [ k, v ]) =>
      ([ ...acc, v.initialState$().map(x => ({ [k]: x })) ]), []);

  // Zip all the streams so they emit only on the last
  // [zip -> merge] if you want the app to render immediately (could overwrite some early actions)
  return Observable.zip(...initialStates$)
  .combineAll((...args) =>
    args.reduce((acc, curr) => ({ ...acc, ...curr }), defaultState));
};

// The action/behaviour streams
export const behaviourDriver = (state$, behaviours) =>
  Observable.merge(
    ...Object.values(behaviours).map(fn$ =>
      fn$({ state$ }).map(fn => ({ fn, type: fn$.name }))))
  .withLatestFrom(state$, ({ fn, type }, state) => {
    const newState = fn(state); // New state from action fn ie updateUserFn(latestState)
    logAction({ type, payload: newState });
    return newState;
  })
  .retry(1000);

// History location
export const history = createBrowserHistory();

export const historyDriver = (state$, guest) => {
  const history$ = Observable.create(observer =>
    history.listen(location => observer.next(location)))
  .startWith(history.location);

  return history$.withLatestFrom(state$, ({ pathname }, state) =>
    // Actions on routes, ie /logout should perform at least api call & redirect
    onRouteActions({ state, pathname }, guest))
  .filter(identity);
};
