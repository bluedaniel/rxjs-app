import {
  AccountLayout, SearchLayout
} from 'components/sections';
import { guestRoutes } from 'routes/guestRoutes';

export const appRoutes = {
  ...guestRoutes,
  '/account': {
    view: AccountLayout
  },

  // Match `/search` & `/search/51.123,-0.123`
  '/search\\/?((?:\\-?\\d+(?:\\.\\d+)?),\\s*(?:\\-?\\d+(?:\\.\\d+)?))?': {
    view: SearchLayout, onRoute: [ { type: 'SEARCH' } ], onParamChange: [ { type: 'SEARCH' } ]
  }
};
