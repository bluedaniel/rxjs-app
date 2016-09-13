import { compose, set, lensProp, uuid } from 'core/utils';

const toastTimeout = 5000;

const storeLens = lensProp('toastStore');

export const toastStore = {
  defaultState () {
    return {
      toasts: []
    };
  },
  getTimeoutLength () {
    return toastTimeout;
  },
  addToast (toast) {
    const toasts = Array.isArray(toast) ? toast : [ toast ];
    const formattedToasts = toasts.map(e => ({ id: uuid(), ...e, time: Date.now() }));
    return state => {
      const toasts = state.toastStore.toasts.concat(formattedToasts);
      return compose(set(storeLens, { toasts }))(state);
    };
  },
  removeToasts () {
    return state => {
      const toasts = state.toastStore.toasts.filter(({ time }) =>
        time && time >= Date.now() - toastTimeout);
      return compose(set(storeLens, { toasts }))(state);
    };
  }
};
