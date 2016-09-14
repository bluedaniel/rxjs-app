import {
  append, compose, concat, filter, head, identity, is, isArrayLike, isEmpty,
  join, length, lens, lensPath, lensProp, merge, map, match, of, once, over,
  prop, propEq, set, slice, trim, unless, view
} from 'ramda';
import { tagNames } from 'constants/tagNames';

export {
  append, compose, concat, filter, head, identity, is, isArrayLike, isEmpty,
  join, length, lens, lensPath, lensProp, merge, map, match, of, once, over,
  prop, propEq, set, slice, trim, unless, view
};

export const uuid = () => {
  const s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return `${new Date().getTime()}${s4()}${s4()}${s4()}`;
};

export const noop = () => {};

export const safe = (fn, or = undefined) => {
  try { return fn(); } catch (e) { return or; }
};

export const coerceArray = unless(isArrayLike, of);

const padEnd = (n, c = '0') => v =>
  String(v).length >= n ? '' + v : (String(c).repeat(n) + v).slice(-n);

export const classSet = (...args) => {
  const cn = arg => {
    if (Array.isArray(arg)) return arg.map(cn);
    return is(Object, arg) ? compose(join('.'), map(head), filter(x => x[1]), Object.entries)(arg) : arg;
  };
  return compose(once(x => `.${x}`), trim, join('.'), filter(identity), map(cn))(args);
};

export const addBasicMeta = e => merge({ id: uuid(), time: Date.now() }, e);

/* eslint-disable no-console */
export const log = console.log.bind(console);
export const info = console.info.bind(console);
export const warn = console.warn.bind(console);
export const error = console.error.bind(console);
export const time = (console.time ? console.time : console.log).bind(console);
export const timeEnd = (console.timeEnd ? console.timeEnd : console.log).bind(console);
export const group = (console.groupCollapsed ? console.groupCollapsed : console.log).bind(console);
export const groupEnd = (console.groupEnd ? console.groupEnd : console.log).bind(console);
/* eslint-enable no-console */

const formatTime = (t = new Date()) =>
  compose(join(':'), map(padEnd(2)))([
    t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()
  ]);

export const logAction = ({ type, payload }) => {
  group(`%c action @ ${formatTime()} ${type}`, 'color:#3E38EA;font-weight:normal;');
  log(payload);
  groupEnd();
};

export const logState = (state) => {
  group(`%c render @ ${formatTime()}`, 'color:#3990D3;font-weight:normal;');
  log(state);
  groupEnd();
};

// Hyperscript helper
const isSelector = param => {
  const validStr = param => is(String, param) && param.length > 0;
  const startsWith = (string, start) => string[0] === start;
  return validStr(param) && startsWith(param, '.') || startsWith(param, '#');
};

const node = h =>
  tagName =>
    (first, ...rest) => {
      if (isSelector(first)) return h(tagName + first, ...rest);
      if (typeof first === 'undefined') return h(tagName);
      return h(tagName, first, ...rest);
    };

export const hh = h => {
  const createTag = node(h);
  const exported = { tagNames, isSelector, createTag };
  tagNames.map(n => {
    exported[n] = createTag(n);
  });
  return exported;
};
