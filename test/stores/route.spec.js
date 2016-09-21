import { test } from 'ava';
import { compose, view, lensPath, prop, head } from 'core/utils';
import { routeStore } from 'stores/route';

const defaultState = { routeStore: routeStore.defaultState() };

test('setRoute', t => {
  const newState = compose(
    routeStore.setRoute({ matchedRoute: '/search', params: ['5', '2'] })
  )(defaultState);

  t.is(defaultState.routeStore.currentRoute, null);
  t.is(defaultState.routeStore.currentParams, null);
  t.is(newState.routeStore.currentRoute, '/search');
  t.deepEqual(newState.routeStore.currentParams, ['5', '2']);
});
