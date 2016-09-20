import '../../src/scripts/core/rxBindings';
import Rx from 'rxjs/Rx';
import { test } from 'ava';
import { compose, over, lensProp, last, match, prop } from 'ramda';
import { rlog } from '../../src/scripts/core/utils';
import * as stores from '../../src/scripts/stores';
import { DOM$ } from '../../src/scripts/core/sinks';

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

test('[core/sinks] DOM$ empty', t => {
  t.plan(0);
  return DOM$(Rx.Observable.of(null));
});

test('[core/sinks] DOM$ defaultState', t => {
  t.plan(0);
  return DOM$(Rx.Observable.of(defaultState));
});

test.cb('[core/sinks] DOM$ route `/`', t => {
  t.plan(3);
  DOM$(observableWithRoute('/'))
  .take(1)
  .subscribe(({ sel, children }) => {
    t.truthy(compose(match(/^section.HomeLayout/), prop('sel'), last)(children));
    t.is(sel, 'div.page');
    t.is(children.length, 5);
    t.end();
  });
});

test.cb('[core/sinks] DOM$ route `/account`', t => {
  t.plan(3);
  DOM$(observableWithRoute('/account'))
  .take(1)
  .subscribe(({ sel, children }) => {
    t.truthy(compose(match(/^section.AccountLayout/), prop('sel'), last)(children));
    t.is(sel, 'div.page');
    t.is(children.length, 5);
    t.end();
  });
});