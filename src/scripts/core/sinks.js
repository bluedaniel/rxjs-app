import { identity, logState } from 'core/utils';
import { getView } from 'core/router';
import { App } from 'components/app';

export const DOM$ = state$ =>
  state$.filter(identity)
  .map(state => state.toJS()) // Views use js objects rather than immutable
  .filter(({ routeStore: { currentRoute } }) => currentRoute)
  .sampleTime(1000 / 60) // Rerender at a maximum of 60fps
  .do(logState)
  .map(state => {
    // Get the view that the router wants
    const { routeStore: { currentRoute } } = state;
    return { state, view: getView(currentRoute) };
  })
  .map(App); // Finally render the root el
