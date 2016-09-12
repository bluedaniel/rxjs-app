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

test('[core/utils] nanoToSeconds', t => {
  t.is(nanoToSeconds(500000), 0.5);
  t.is(nanoToSeconds(123123311), 123.123311);
});

test('[core/utils] toCurrency', t => {
  t.is(toCurrency(1), '1.00');
  t.is(toCurrency(100), '100.00');
  t.is(toCurrency(0.5), '0.50');
});
