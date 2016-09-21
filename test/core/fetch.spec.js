import { test } from 'ava';
import fetchMock from 'fetch-mock';
import { apiResp } from '../helpers/apiResp';
import { noop, head } from '../../src/scripts/core/utils';
import { request, get, post } from '../../src/scripts/core/fetch';

const [ mockSuccess, mockError ] = [ 'http://success.com', 'http://error.com' ];

fetchMock
.get(mockSuccess, apiResp({ results: [{ id: 'get/123' }] }))
.post(mockSuccess, apiResp({ results: [{ id: 'post/123' }] }))
.get(mockError, apiResp({ errors: [{ message: 'get/fail' }] }))
.post(mockError, apiResp({ errors: [{ message: 'post/fail' }] }));

test('[core/fetch] get/success', t =>
  get(mockSuccess).then(({ results }) => {
    t.deepEqual(results[0], { id: 'get/123' });
  }));

test('[core/fetch] post/success', t =>
  post(mockSuccess).then(({ results }) => {
    t.deepEqual(results[0], { id: 'post/123' });
  }));

test('[core/fetch] request get/success', t =>
  request(() => get(mockSuccess), {}, {
    success: $ => $.map(({ results }) => head(results))
      .map(({ id }) => t.is(id, 'get/123'))
  }));

test('[core/fetch] request post/success', t =>
  request(() => post(mockSuccess), {}, {
    success: $ => $.map(({ results }) => head(results))
      .map(({ id }) => t.is(id, 'post/123'))
  }));

test('[core/fetch] request get/error', t =>
  request(() => get(mockError), {}, {
    error: $ => $.map(({ errors }) => head(errors))
      .map(({ message }) => t.is(message, 'get/fail'))
  }));

test('[core/fetch] request post/error', t =>
  request(() => post(mockError), {}, {
    error: $ => $.map(({ errors }) => head(errors))
      .map(({ message }) => t.is(message, 'post/fail'))
  }));
