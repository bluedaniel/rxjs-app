import { Observable } from 'rxjs/Observable';
import * as stores from 'stores/';
import { onRouteActions } from 'core/router';
import { identity, logAction } from 'core/utils';

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

// History location driver & event listener
export const historyDriver = (history$, state$, guest) => {
  // Add event listener for browser events (back/forward)
  window.addEventListener('popstate', ({ state }) => {
    if (state === undefined) return; // Ignore extraneous popstate events in WebKit.
    history$.next(window.location.pathname);
  });

  return history$
  .startWith(window.location.pathname)
  .filter(identity)
  .withLatestFrom(state$, (pathname, state) =>
    // Actions on routes, ie /logout should perform at least api call & redirect
    onRouteActions({ state, pathname }, guest));
};
