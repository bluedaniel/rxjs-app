import { uuid } from 'core/utils';

const toastTimeout = 5000;

const toastPath = [ 'toastStore', 'toasts' ];

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
      const toasts = state.getIn(toastPath);
      return state.setIn(toastPath, toasts.concat(formattedToasts));
    };
  },
  removeToasts () {
    return state => {
      return state.setIn(toastPath, state.getIn(toastPath).filter(({ time }) =>
        time && time >= Date.now() - toastTimeout));
    };
  }
};
