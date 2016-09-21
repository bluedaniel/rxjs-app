import { test } from 'ava';
import { compose, view, lensPath, prop, head } from 'core/utils';
import { searchStore } from 'stores/search';

const defaultState = { searchStore: searchStore.defaultState() };

test('updateResults', t => {
  const newState = compose(
    searchStore.updateResults([1])
  )(defaultState);

  t.deepEqual(defaultState.searchStore.searchResults, []);
  t.deepEqual(newState.searchStore.searchResults, [1]);
});
