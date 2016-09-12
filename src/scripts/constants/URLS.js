const host = '/api';

export const URLS = Object.entries({
  login: '/login',
  logout: '/logout',
  getUser: '/user',
  getSearch: '/search'
}).reduce((acc, [ k, v ]) =>
  ({ ...acc, [k]: `${host}${v}` }), {});
