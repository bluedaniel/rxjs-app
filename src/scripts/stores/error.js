import { uuid } from 'core/utils';

const errorTimeout = 4000;

const errPath = [ 'errorStore', 'errors' ];

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
      const errors = state.getIn(errPath);
      return state.setIn(errPath, errors.concat(formattedErrs));
    };
  },
  removeErrors () {
    return state => {
      return state.setIn(errPath, state.getIn(errPath).filter(({ time }) =>
        time && time >= Date.now() - errorTimeout));
    };
  }
};
