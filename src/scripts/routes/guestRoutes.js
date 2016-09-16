import {
  HomeLayout, AboutLayout, LoginLayout
} from 'components/sections';

export const guestRoutes = {
  '/': { view: HomeLayout },
  '/login': { view: LoginLayout },
  '/logout': { view: null, onRoute: [ { type: 'LOGOUT' } ] },
  '/about': { view: AboutLayout,
    onRoute: [
      { type: 'ERROR', payload: { message: 'This is an error triggered on route action' } }
    ]
  }
};
