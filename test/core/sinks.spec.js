import Rx from 'rxjs/Rx';
import { test } from 'ava';
import { compose, over, lensProp, last, match, prop } from 'ramda';
import { rlog } from 'core/utils';
import * as stores from 'stores/';
import { DOM$ } from 'core/sinks';

const defaultState = Object.entries(stores).reduce((acc, [ k, v ]) =>
  ({ ...acc, [k]: v.defaultState() }), {});

const observableWithRoute = (currentRoute = '/') =>
  Rx.Observable.create(observer => {
    observer.next(null);
    setTimeout(() =>
      observer.next(compose(over(lensProp('routeStore'), () => ({
        currentRoute,
        currentParams: ''
      })))(defaultState))
    , 1000 / 59);
  });

test('DOM$ empty', t => {
  t.plan(0);
  return DOM$(Rx.Observable.of(null));
});

test('DOM$ defaultState', t => {
  t.plan(0);
  return DOM$(Rx.Observable.of(defaultState));
});

test('DOM$ route `/`', t =>
  DOM$(observableWithRoute('/'))
  .take(1)
  .map(({ sel, children }) => {
    t.truthy(compose(match(/^section.HomeLayout/), prop('sel'), last)(children));
    t.is(sel, 'div.page');
    t.is(children.length, 5);
  }));

test('DOM$ route `/account`', t =>
  DOM$(observableWithRoute('/account'))
  .take(1)
  .map(({ sel, children }) => {
    t.truthy(compose(match(/^section.AccountLayout/), prop('sel'), last)(children));
    t.is(sel, 'div.page');
    t.is(children.length, 5);
  }));
