import { compose, get as _get, head, noop } from 'lodash/fp';
import { get, request } from 'core/fetch';
import { URLS } from 'constants/URLS';

export const accountStore = {
  defaultState () {
    return {
      user: {}
    };
  },
  initialState$ () {
    return request(() => get(URLS.getUser), {}, {
      immediate: noop,
      always: noop,
      error: $ => $.mapTo(accountStore.defaultState()),
      success: $ => $.map(compose(head, _get('results')))
    });
  },
  setUser (user) {
    return state =>
      state.mergeIn([ 'accountStore', 'user' ], user);
  },
  clearUser () {
    return state =>
      state.setIn([ 'accountStore', 'user' ], {});
  }
};
