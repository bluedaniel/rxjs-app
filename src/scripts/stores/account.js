import { compose, prop, head, noop, over, lensProp } from 'core/utils';
import { get, request } from 'core/fetch';
import { URLS } from 'constants/URLS';

const storeLens = lensProp('accountStore');

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
      error: $ => $.map(accountStore.defaultState),
      success: $ => $.map(compose(head, prop('results')))
        .map(user => ({ user }))
    });
  },
  setUser (user) {
    return compose(over(storeLens, () => ({ user })));
  },
  clearUser () {
    return compose(over(storeLens, () => ({ user: {} })));
  }
};
