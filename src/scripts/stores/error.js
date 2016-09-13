import { uuid } from 'core/utils';

const errorTimeout = 4000;

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
      return ({ ...state, errorStore: { errors } });
    };
  },
  removeErrors () {
    return state => {
      const errors = state.errorStore.errors.filter(({ time }) =>
        time && time >= Date.now() - errorTimeout);
      return ({ ...state, errorStore: { errors } });
    };
  }
};
