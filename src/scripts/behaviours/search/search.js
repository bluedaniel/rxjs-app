import { actions } from 'actions/';
import { get, request } from 'core/fetch';
import { searchStore } from 'stores/';
import { URLS } from 'constants/URLS';

export const search$ = () =>
  actions.SEARCH$.mergeMap(inputValue =>
    request(() => get(`${URLS.getSearch}/${inputValue || ''}`), actions, {
      success: $ => $.map(data => searchStore.updateResults(inputValue, data))
    }));
