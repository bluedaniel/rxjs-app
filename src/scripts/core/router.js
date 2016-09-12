import { compose, filter, head, thru, slice, isEqual, identity } from 'lodash/fp';
import { actions } from 'actions/';
import { history } from 'core/drivers';
import { guestRoutes, appRoutes } from 'routes/';

export const link = (path) => history.push(path);

export const getView = route => appRoutes[route].view;

export const onRouteActions = ({
  state: { routeStore: { currentRoute, currentParams } },
  pathname
}, guest) => {
  const { matchedRoute, params } = getMatchedRoute(pathname);
  const availableRoutes = guest ? guestRoutes[matchedRoute] : appRoutes[matchedRoute];
  const { onRoute = [], onParamChange = [] } = availableRoutes;

  const newRoute = !isEqual(currentRoute, matchedRoute);
  const newParams = !isEqual(currentParams, params);

  if (!newRoute && !newParams) return; // No route change

  const mapActions = mapActionsOn(params);

  return () => {
    actions.ROUTE$.next({ matchedRoute, params });
    if (newRoute) mapActions(onRoute);
    if (newParams) mapActions(onParamChange);
  };
};

const mapActionsOn = (params) => arr =>
  arr.map(({ type, payload }) => actions[`${type}$`].next({ ...payload, params }));

const toRegex = str => new RegExp(`^${str}$`);

const getMatchedRoute = (path) => {
  const matchedRoute = compose(
    head, filter(i => toRegex(i).test(path))
  )(Object.keys(appRoutes)) || '/';

  const params = compose(
    filter(identity), slice(1, 20), thru(a => path.match(a)), toRegex
  )(matchedRoute);

  return { matchedRoute, params };
};
