import test from 'ava';
import { toCurrency, nanoToSeconds, classSet, safe } from 'core/utils';

test('[core/utils] classSet', t => {
  t.is(classSet('foobar'), '.foobar');
  t.is(classSet('foo', 'bar'), '.foo.bar');
  t.is(classSet('foo', { bar: true }), '.foo.bar');
  t.is(classSet({ 'foo-bar': true }), '.foo-bar');
  t.is(classSet({ 'foo-bar': false }), '.');
  t.is(classSet({ foo: true }, { bar: true }), '.foo.bar');
  t.is(classSet({ foo: true, bar: true }), '.foo.bar');
  t.is(classSet('foo', { bar: true, duck: false }, 'baz', { quux: true }), '.foo.bar.baz.quux');
  t.is(classSet(null, false, 'bar', undefined, 0, 1, { baz: null }, ''), '.bar.1');
});

test('[core/utils] safe', t => {
  t.is(safe(() => 'hello'), 'hello');
  t.is(safe(() => foo), undefined);
  t.is(safe(() => bar, 'baz'), 'baz');
});
