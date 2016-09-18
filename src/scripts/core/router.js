import { history$ } from 'core/subjects';
import { actions } from 'actions/';
import { compose, equals, filter, head, slice, identity, match } from 'core/utils';
import { guestRoutes, appRoutes } from 'routes/';

// link function used to route inside the app using history
export const link = path => {
  window.history.pushState(null, null, path);
  history$.next(path);
};

// This function runs on every history observable change
// It will run actions if there is a route change that calls for them ie Logout
export const onRouteActions = ({
  state: { routeStore: { currentRoute, currentParams } },
  pathname
}, guest) => {
  const { matchedRoute, params } = getMatchedRoute(pathname);
  const availableRoutes = guest ? guestRoutes[matchedRoute] : appRoutes[matchedRoute];
  const { onRoute = [], onParamChange = [] } = availableRoutes;

  const newRoute = currentRoute !== matchedRoute;
  const newParams = currentParams !== params;

  if (!newRoute && !newParams) return; // No route change

  const mapActions = arr =>
    arr.map(({ type, payload }) =>
      actions[`${type}$`].next({ ...payload, params }));

  return () => {
    actions.ROUTE$.next({ matchedRoute, params });
    if (newRoute && newParams && equals(onRoute, onParamChange)) {
      return mapActions(onRoute);
    }
    if (newRoute) mapActions(onRoute);
    if (newParams) mapActions(onParamChange);
  };
};

// Regular expressions to find the matching path in routes
const getMatchedRoute = path => {
  const toRegex = str => new RegExp(`^${str}$`);

  const matchedRoute = compose(
    head, filter(i => toRegex(i).test(path))
  )(Object.keys(appRoutes)) || '/';

  const params = compose(
    filter(identity), slice(1, 20), match(toRegex(matchedRoute))
  )(path);

  return { matchedRoute, params };
};
