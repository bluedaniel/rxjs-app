import { compose, over, lensProp } from 'core/utils';

export const routeStore = {
  defaultState () {
    return {
      currentRoute: null,
      currentParams: null
    };
  },
  setRoute ({ matchedRoute, params }) {
    return compose(over(lensProp('routeStore'), () => ({
      currentRoute: matchedRoute,
      currentParams: params
    })));
  }
};
