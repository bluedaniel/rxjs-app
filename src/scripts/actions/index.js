import { Subject } from 'rxjs/Subject';

const actionsDriver = (...actions) =>
  actions.reduce((acc, key) =>
    ({ ...acc, [`${key}$`]: new Subject() }), {});

export const actions = actionsDriver(
  'ROUTE',
  'ERROR',
  'TOAST',

  'LOGIN',
  'LOGOUT',

  'SEARCH'
);
