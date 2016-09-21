import { test } from 'ava';
import { compose, view, lensPath, prop, head } from 'core/utils';
import { errorStore } from 'stores/error';

const viewErrors = view(lensPath([ 'errorStore', 'errors' ]));
const defaultState = { errorStore: errorStore.defaultState() };

test('getTimeout', t => {
  t.is(errorStore.getTimeout(), 4000);
});

test('addError', t => {
  const newState = compose(
    errorStore.addError({ message: '¯\_(ツ)_/¯' })
  )(defaultState);

  t.is(viewErrors(defaultState).length, 0);
  t.is(viewErrors(newState).length, 1);
  t.is(viewErrors(newState)[0].message, '¯\_(ツ)_/¯');
});

test('removeError', t => {
  const newState = compose(
    errorStore.addError({ message: 'err2' }),
    errorStore.addError({ message: 'err1' })
  )(defaultState);

  const id = compose(prop('id'), head, viewErrors)(newState);
  const finalState = errorStore.removeError(id)(newState);

  t.is(viewErrors(finalState).length, 1);
  t.is(viewErrors(finalState)[0].message, 'err2');
});

test('removeErrors', t => {
  const time = Date.now() - (errorStore.getTimeout() * 1.1);
  const newState = compose(
    errorStore.addError({ time, message: 'err3' }),
    errorStore.addError({ time, message: 'err2' }),
    errorStore.addError({ time, message: 'err1' })
  )(defaultState);

  const finalState = errorStore.removeErrors()(newState);

  t.is(viewErrors(newState).length, 3);
  t.is(viewErrors(finalState).length, 0);
});
