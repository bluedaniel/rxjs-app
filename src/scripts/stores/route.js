export const routeStore = {
  defaultState () {
    return {
      currentRoute: null,
      currentParams: null
    };
  },
  setRoute ({ matchedRoute, params }) {
    return state =>
      ({ ...state,
        routeStore: {
          currentRoute: matchedRoute,
          currentParams: params
        }
      });
  }
};
