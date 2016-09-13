import {
  compose, concat, set, filter, lensPath, view, uuid, coerceArray
} from 'core/utils';

const errorLens = lensPath([ 'errorStore', 'errors' ]);

export const errorStore = {
  defaultState () {
    return { errors: [] };
  },
  getTimeout () {
    return 4000;
  },
  addError (err) {
    const createError = e => ({ id: uuid(), ...e, time: Date.now() });
    return state => {
      const errors = compose(concat(coerceArray(err).map(createError)), view(errorLens))(state);
      return compose(set(errorLens, errors))(state);
    };
  },
  removeErrors () {
    return state => {
      const filterTime = ({ time }) => time >= Date.now() - errorStore.getTimeout();
      const errors = compose(filter(filterTime), view(errorLens))(state);
      return compose(set(errorLens, errors))(state);
    };
  }
};
