import { test } from 'ava';
import { compose, view, lensPath, prop, head } from 'core/utils';
import { globalStore } from 'stores/global';

const defaultState = { globalStore: globalStore.defaultState() };

test('toggleLoading', t => {
  const newState = compose(
    globalStore.toggleLoading()
  )(defaultState);

  t.is(defaultState.globalStore.loading, false);
  t.is(newState.globalStore.loading, false);
  t.is(newState.globalStore.loadingText, 'Loading');
});

test('toggleLoading with params', t => {
  const newState = compose(
    globalStore.toggleLoading(true, '¯\_(ツ)_/¯')
  )(defaultState);

  t.is(defaultState.globalStore.loading, false);
  t.is(newState.globalStore.loading, true);
  t.is(newState.globalStore.loadingText, '¯\_(ツ)_/¯');
});
