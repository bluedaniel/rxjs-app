import objectDiff from 'objectdiff';
import { compose, join, map, tap } from 'core/utils';

export const log = console.log.bind(console);
export const info = console.info.bind(console);
export const warn = console.warn.bind(console);
export const error = console.error.bind(console);
export const time = (console.time ? console.time : console.log).bind(console);
export const timeEnd = (console.timeEnd ? console.timeEnd : console.log).bind(console);
export const group = (console.groupCollapsed ? console.groupCollapsed : console.log).bind(console);
export const groupEnd = (console.groupEnd ? console.groupEnd : console.log).bind(console);

export const rlog = tap(log);

const padEnd = (n, c = '0') => v =>
  String(v).length >= n ? '' + v : (String(c).repeat(n) + v).slice(-n);

const formatTime = (t = new Date()) =>
  compose(join(':'), map(padEnd(2)))([
    t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()
  ]);

export const logger = ({ type, state, payload, newState }) => {
  if (process.env.NODE_ENV !== 'development') return;

  const title = `%c ${type ? 'action' : 'render'} @ ${formatTime()} ${type || ''}`;
  const style = `color:#${type ? '3E38EA' : '3990D3'};font-weight:normal;`;

  group(title, style);
  if (newState) {
    const { value } = objectDiff.diff(state, newState);
    const diff = Object.keys(value).reduce((acc, curr) =>
      value[curr].changed !== 'equal' ? { ...acc, [curr]: value[curr] } : acc, {});
    log({ payload, diff });
  } else {
    log({ state });
  }
  groupEnd();
};
