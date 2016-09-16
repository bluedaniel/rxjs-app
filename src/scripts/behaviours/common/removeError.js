import { actions } from 'actions/';
import { errorStore } from 'stores/';

export const onRemoveError$ = () =>
  actions.ERROR_REMOVE$.map(errorStore.removeError);
