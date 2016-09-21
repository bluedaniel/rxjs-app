import Rx from 'rxjs/Rx';
import { test } from 'ava';
import * as subjects from 'core/subjects';

test('subjects', t => {
  const kvSubjects = Object.entries(subjects);
  t.is(kvSubjects.length, 2);
  t.is(kvSubjects[0][0], 'state$');
  t.is(kvSubjects[1][0], 'history$');
});

test('state$', t => {
  subjects.state$.next('test');
  t.is(subjects.state$.getValue(), 'test');
});

test('history$', t => {
  subjects.history$.next('test');
  t.is(subjects.history$.getValue(), 'test');
});
