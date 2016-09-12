import { Observable } from 'rxjs/Observable';
import { actions } from 'actions/';
import { errorStore } from 'stores/';

const timeoutErrors$ = Observable
  .timer(errorStore.getTimeoutLength() + 1)
  .map(errorStore.removeErrors);

export const onError$ = () => {
  const errors$ = actions.ERROR$.map(errorStore.addError);

  return Observable.merge(errors$, errors$.mergeMap(() => timeoutErrors$));
};
