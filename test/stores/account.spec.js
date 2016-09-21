import { test } from 'ava';
import fetchMock from 'fetch-mock';
import { compose, view, lensPath, prop, head } from 'core/utils';
import { accountStore } from 'stores/account';
import { apiResp } from '../helpers/apiResp';

const viewUser = view(lensPath([ 'accountStore', 'user' ]));

const defaultState = { accountStore: accountStore.defaultState() };

fetchMock
.get('/api/user', apiResp({ results: [{ name: 'Bar' }] }))

test('initialState$', t => {
  t.plan(1);
  return accountStore.initialState$()
    .map(data => {
      t.deepEqual(data, { user: { name: 'Bar' } });
    });
});

test('setUser', t => {
  const newState = compose(
    accountStore.setUser({ name: 'Foo' })
  )(defaultState);
  t.deepEqual(viewUser(newState), { name: 'Foo' });
});

test('clearUser', t => {
  const newState = compose(
    accountStore.clearUser()
  )(defaultState);
  t.deepEqual(viewUser(newState), {});
});


// import { compose, prop, head, noop, over, lensProp } from 'core/utils';
// import { get, request } from 'core/fetch';
// import { URLS } from 'constants/URLS';
//
// const storeLens = lensProp('accountStore');
//
// export const accountStore = {
//   defaultState () {
//     return {
//       user: {}
//     };
//   },
//   initialState$ () {
//     return request(() => get(URLS.getUser), {}, {
//       immediate: noop,
//       always: noop,
//       error: $ => $.map(accountStore.defaultState),
//       success: $ => $.map(compose(head, prop('results')))
//         .map(user => ({ user }))
//     });
//   },
//   setUser (user) {
//     return compose(over(storeLens, () => ({ user })));
//   },
//   clearUser () {
//     return compose(over(storeLens, () => ({ user: {} })));
//   }
// };
