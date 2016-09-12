import {
  AccountLayout
} from 'components/sections';
import { guestRoutes } from 'routes/guestRoutes';

export const appRoutes = {
  ...guestRoutes,
  '/account': {
    view: AccountLayout
  }
};
