import Rx from 'rxjs/Rx';
import { test } from 'ava';
import fetchMock from 'fetch-mock';
import { noop, head } from 'core/utils';
import { request, get, post } from 'core/fetch';
import { apiResp } from '../helpers/apiResp';

const [ mockSuccess, mockError, mockFail ] = [
  'http://success.com', 'http://error.com', 'http://fail.com'
];

fetchMock
.get(mockSuccess, apiResp({ results: [{ id: 'get/123' }] }))
.post(mockSuccess, apiResp({ results: [{ id: 'post/123' }] }))
.get(mockError, apiResp({ errors: [{ message: 'get/fail' }] }))
.post(mockError, apiResp({ errors: [{ message: 'post/fail' }] }))
.get(mockFail, 500);

test('get/success', t =>
  get(mockSuccess).then(({ results }) => {
    t.deepEqual(results[0], { id: 'get/123' });
  }));

test('post/success', t =>
  post(mockSuccess).then(({ results }) => {
    t.deepEqual(results[0], { id: 'post/123' });
  }));

test('request get/success', t =>
  request(() => get(mockSuccess), {}, {
    success: $ => $.map(({ results }) => head(results))
      .map(({ id }) => t.is(id, 'get/123'))
  }));

test('request post/success', t =>
  request(() => post(mockSuccess), {}, {
    success: $ => $.map(({ results }) => head(results))
      .map(({ id }) => t.is(id, 'post/123'))
  }));

test('request get/error', t =>
  request(() => get(mockError), {}, {
    error: $ => $.map(({ errors }) => head(errors))
      .map(({ message }) => t.is(message, 'get/fail'))
  }));

test('request post/error', t =>
  request(() => post(mockError, { body: { convert: 'data' } }), {}, {
    error: $ => $.map(({ errors }) => head(errors))
      .map(({ message }) => t.is(message, 'post/fail'))
  }));

test('request get/immediate', t =>
  request(() => get(mockSuccess), {}, {
    immediate: () => Rx.Observable.of('test')
  })
  .take(1)
  .map(data => t.is(data, 'test')));

test('request get/always', t =>
  request(() => get(mockSuccess), {}, {
    success: $ => $.mapTo('foo'),
    always: () => Rx.Observable.of('test')
  })
  .skip(2)
  .map(data => t.is(data, 'test')));

test('request get/fail', t =>
  request(() => get(mockFail), {}, {
    error: $ => $.map(({ errors }) => head(errors))
      .map(x => t.is(x, 'Internal Server Error'))
  }));
