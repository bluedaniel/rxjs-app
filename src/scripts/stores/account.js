import { compose, prop, head, noop } from 'ramda';
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
      immediate: () => noop,
      always: () => noop,
      error: $ => $.map(accountStore.defaultState),
      success: $ => $.map(compose(head, prop('results')))
        .map(user => ({ user }))
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
