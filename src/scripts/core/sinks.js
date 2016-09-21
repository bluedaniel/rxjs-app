import { identity } from 'core/utils';
import { logger } from 'core/logger';
import { appRoutes } from 'routes/';
import { App } from 'components/app';

// Find the matching view component for the route
const getView = route => appRoutes[route].view;

export const DOM$ = state$ =>
  state$
  .filter(identity)
  .filter(({ routeStore: { currentRoute } }) => currentRoute)
  .sampleTime(1000 / 60) // Rerender at a maximum of 60fps
  .do(logger)
  .map(state => {
    // Get the view that the router wants
    const { routeStore: { currentRoute } } = state;
    return { state, view: getView(currentRoute) };
  })
  .filter(({ view }) => identity(view))
  .map(App); // Finally render the root el
