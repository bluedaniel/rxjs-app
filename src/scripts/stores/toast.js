import {
  addBasicMeta, compose, filter, lensPath, append, over
} from 'core/utils';

const toastLens = lensPath([ 'toastStore', 'toasts' ]);

export const toastStore = {
  defaultState () {
    return { toasts: [] };
  },
  getTimeout () {
    return 5000;
  },
  addToast (toast) {
    return compose(over(toastLens, append(addBasicMeta(toast))));
  },
  removeToasts () {
    return compose(over(toastLens, filter(({ time }) =>
      time >= Date.now() - toastStore.getTimeout())));
  }
};
