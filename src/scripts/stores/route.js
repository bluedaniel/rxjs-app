import { compose, set, lensProp } from 'core/utils';

export const routeStore = {
  defaultState () {
    return {
      currentRoute: null,
      currentParams: null
    };
  },
  setRoute ({ matchedRoute, params }) {
    return compose(set(lensProp('routeStore'), {
      currentRoute: matchedRoute,
      currentParams: params
    }));
  }
};
