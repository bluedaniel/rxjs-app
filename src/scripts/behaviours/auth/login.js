import { identity, prop, compose, head } from 'ramda';
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
      success: $ => $.do(a => console.log(a)).map(compose(head, prop('results')))

        .do(() => {
          console.log('go!');
          window.location.href = '/';
        })
        .map(() => identity)
    });
  });
