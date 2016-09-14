import {
  compose, over, append, filter, lensPath, addBasicMeta
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
    return compose(over(errorLens, append(addBasicMeta(err))));
  },
  removeErrors () {
    return compose(over(errorLens, filter(({ time }) =>
      time >= Date.now() - errorStore.getTimeout())));
  }
};
