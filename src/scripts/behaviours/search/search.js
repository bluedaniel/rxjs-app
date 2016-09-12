import { compose, join, get as _get } from 'lodash/fp';
import { actions } from 'actions/';
import { get, request } from 'core/fetch';
import { searchStore } from 'stores/';
import { URLS } from 'constants/URLS';

export const search$ = () =>
  actions.SEARCH$
  .map(compose(join(''), _get('params')))
  .mergeMap(searchVal =>
    request(() => get(`${URLS.getSearch}/${searchVal}`), actions, {
      success: $ => $.map(compose(_get('results')))
        .map(searchStore.updateResults)
    }));
