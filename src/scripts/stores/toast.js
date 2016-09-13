import {
  compose, concat, set, filter, lensPath, view, uuid, coerceArray
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
    const createToast = e => ({ id: uuid(), ...e, time: Date.now() });
    return state => {
      const toasts = compose(concat(coerceArray(toast).map(createToast)), view(toastLens))(state);
      return compose(set(toastLens, toasts))(state);
    };
  },
  removeToasts () {
    return state => {
      const filterTime = ({ time }) => time >= Date.now() - toastStore.getTimeout();
      const toasts = compose(filter(filterTime), view(toastLens))(state);
      return compose(set(toastLens, toasts))(state);
    };
  }
};
