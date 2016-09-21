import { test } from 'ava';
import { compose, view, lensPath } from 'core/utils';
import { toastStore } from '../../src/scripts/stores/toast';

const viewToasts = view(lensPath([ 'toastStore', 'toasts' ]));
const defaultState = { toastStore: toastStore.defaultState() };

test('getTimeout', t => {
  t.is(toastStore.getTimeout(), 5000);
});

test('addToast', t => {
  const newState = compose(
    toastStore.addToast({ message: '¯\_(ツ)_/¯' })
  )(defaultState);

  t.is(viewToasts(defaultState).length, 0);
  t.is(viewToasts(newState).length, 1);
  t.is(viewToasts(newState)[0].message, '¯\_(ツ)_/¯');
});

test('removeToasts', t => {
  const time = Date.now() - (toastStore.getTimeout() * 1.1);
  const newState = compose(
    toastStore.addToast({ time, message: 'toasty3' }),
    toastStore.addToast({ time, message: 'toasty2' }),
    toastStore.addToast({ time, message: 'toasty1' })
  )(defaultState);

  const finalState = toastStore.removeToasts()(newState);

  t.is(viewToasts(newState).length, 3);
  t.is(viewToasts(finalState).length, 0);
});
