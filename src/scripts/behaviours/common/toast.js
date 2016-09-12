import { Observable } from 'rxjs/Observable';
import { actions } from 'actions/';
import { toastStore } from 'stores/';

const timeoutToasts$ = Observable
  .timer(toastStore.getTimeoutLength() + 1)
  .map(toastStore.removeToasts);

export const onToast$ = () => {
  const toasts$ = actions.TOAST$.map(toastStore.addToast);

  return Observable.merge(toasts$, toasts$.mergeMap(() => timeoutToasts$));
};
