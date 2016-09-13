import { compose, set, lensProp, uuid } from 'core/utils';

const errorTimeout = 4000;

const storeLens = lensProp('errorStore');

export const errorStore = {
  defaultState () {
    return {
      errors: []
    };
  },
  getTimeoutLength () {
    return errorTimeout;
  },
  addError (err) {
    const errs = Array.isArray(err) ? err : [ err ];
    const formattedErrs = errs.map(e => ({ id: uuid(), ...e, time: Date.now() }));
    return state => {
      const errors = state.errorStore.errors.concat(formattedErrs);
      return compose(set(storeLens, { errors }))(state);
    };
  },
  removeErrors () {
    return state => {
      const errors = state.errorStore.errors.filter(({ time }) =>
        time && time >= Date.now() - errorTimeout);
      return compose(set(storeLens, { errors }))(state);
    };
  }
};
