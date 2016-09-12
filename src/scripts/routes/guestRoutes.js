import {
  HomeLayout, AboutLayout, SearchLayout, LoginLayout
} from 'components/sections';

export const guestRoutes = {
  '/': { view: HomeLayout },
  '/login': { view: LoginLayout },
  '/logout': {
    view: HomeLayout, onRoute: [ { type: 'LOGOUT' } ]
  },
  '/about': { view: AboutLayout,
    onRoute: [
      { type: 'ERROR', payload: { message: 'This is an error triggered on route action' } }
    ]
  },

  // Match `/search` & `/search/51.123,-0.123`
  '/search\\/?((?:\\-?\\d+(?:\\.\\d+)?),\\s*(?:\\-?\\d+(?:\\.\\d+)?))?': {
    view: SearchLayout, onRoute: [ { type: 'SEARCH' } ], onParamChange: [ { type: 'SEARCH' } ]
  }
};
