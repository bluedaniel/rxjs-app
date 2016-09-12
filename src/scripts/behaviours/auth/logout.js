import { actions } from 'actions/';
import { post, request } from 'core/fetch';
import { URLS } from 'constants/URLS';

export const logout$ = () =>
  actions.LOGOUT$.mergeMap(() =>
    request(() => post(URLS.logout), actions, {
      success: $ => $.do(() => {
        window.location.href = '/';
      })
      .delay(2000)
    }));
