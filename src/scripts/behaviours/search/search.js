import { actions } from 'actions/';
import { get, request } from 'core/fetch';
import { searchStore } from 'stores/';
import { URLS } from 'constants/URLS';
import { compose, join, prop } from 'core/utils';

export const search$ = () =>
  actions.SEARCH$
  .map(compose(join(''), prop('params')))
  .mergeMap(searchVal =>
    request(() => get(`${URLS.getSearch}/${searchVal}`), actions, {
      success: $ => $.map(compose(searchStore.updateResults, prop('results')))
    }));
