import { test } from 'ava';
import fetchMock from 'fetch-mock';
import { noop, head } from 'core/utils';
import { request, get, post } from 'core/fetch';
import { apiResp } from '../helpers/apiResp';

const [ mockSuccess, mockError ] = [ 'http://success.com', 'http://error.com' ];

fetchMock
.get(mockSuccess, apiResp({ results: [{ id: 'get/123' }] }))
.post(mockSuccess, apiResp({ results: [{ id: 'post/123' }] }))
.get(mockError, apiResp({ errors: [{ message: 'get/fail' }] }))
.post(mockError, apiResp({ errors: [{ message: 'post/fail' }] }));

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
  request(() => post(mockError, { mock: 'data' }), {}, {
    error: $ => $.map(({ errors }) => head(errors))
      .map(({ message }) => t.is(message, 'post/fail'))
  }));
