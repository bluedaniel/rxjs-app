import { actions } from 'actions/';
import { noop } from 'core/utils';
import { post, request } from 'core/fetch';
import { URLS } from 'constants/URLS';

export const logout$ = () =>
  actions.LOGOUT$.mergeMap(() =>
    request(() => post(URLS.logout), actions, {
      success: $ => $.do(() => {
        window.location.href = '/';
      })
      .map(noop)
    }));
