import { identity, get as _get, compose, head } from 'lodash/fp';
import { actions } from 'actions/';
import { post, request } from 'core/fetch';
import { URLS } from 'constants/URLS';

export const login$ = () =>
  actions.LOGIN$.map(e => {
    e.preventDefault();
    return {
      username: e.currentTarget.getElementsByClassName('username')[0].value,
      password: e.currentTarget.getElementsByClassName('password')[0].value
    };
  })
  .mergeMap(body => {
    return request(() => post(URLS.login, { body }), actions, {
      success: $ => $.map(compose(head, _get('results')))
        .do(() => {
          window.location.href = '/';
        })
        .map(() => identity)
    });
  });
