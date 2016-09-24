import { test } from 'ava';
import { cx, noop, safe, coerceArray, addBasicMeta } from 'core/utils';

test('cx', t => {
  t.is(cx('foobar'), '.foobar');
  t.is(cx('foo', 'bar'), '.foo.bar');
  t.is(cx('foo', { bar: true }), '.foo.bar');
  t.is(cx({ 'foo-bar': true }), '.foo-bar');
  t.is(cx({ 'foo-bar': false }), '.');
  t.is(cx({ foo: true }, { bar: true }), '.foo.bar');
  t.is(cx({ foo: true, bar: true }), '.foo.bar');
  t.is(cx('foo', { bar: true, duck: false }, 'baz', { quux: true }), '.foo.bar.baz.quux');
  t.is(cx(null, false, 'bar', undefined, 0, 1, { baz: null }, ''), '.bar.1');
});

test('safe', t => {
  t.is(safe(() => 'hello'), 'hello');
  t.is(safe(() => foo), undefined);
  t.is(safe(() => bar, 'baz'), 'baz');
});

test('noop', t => {
  t.is(noop(), undefined);
  t.is(noop(true), undefined);
  t.is(noop([]), undefined);
});

test('coerceArray', t => {
  t.deepEqual(coerceArray(1), [ 1 ]);
  t.deepEqual(coerceArray([1]), [ 1 ]);
  t.deepEqual(coerceArray([]), []);
});

test('addBasicMeta', t => {
  const meta = addBasicMeta({ t: 'test' });
  t.is(typeof meta, 'object');
  t.truthy(meta.id);
  t.truthy(meta.time);
});
