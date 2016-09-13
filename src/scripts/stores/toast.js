import { uuid } from 'core/utils';

const toastTimeout = 5000;

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
      return ({ ...state, toastPath: { toasts } });
    };
  },
  removeToasts () {
    return state => {
      const toasts = state.toastStore.toasts.filter(({ time }) =>
        time && time >= Date.now() - toastTimeout);
      return ({ ...state, toastPath: { toasts } });
    };
  }
};
