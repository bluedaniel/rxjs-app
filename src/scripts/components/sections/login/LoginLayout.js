import h from 'snabbdom/h';
import { classSet, hh } from 'core/utils';
import { actions } from 'actions';
import styles from './LoginLayout.css';

const { section, div, h4, form, input, button, label, p } = hh(h);

export const LoginLayout = () =>
  section(classSet(styles.loginWrap), [
    div([
      h4('Login'),
      form({ on: {
        submit: e => actions.LOGIN$.next(e)
      } }, [
        input(classSet('username'), {
          props: {
            placeholder: 'Username',
            type: 'text',
            value: 'daniel'
          }
        }),
        input(classSet('password'), {
          props: {
            placeholder: 'Password',
            type: 'password',
            value: 'password'
          }
        }),
        p(classSet(styles.rememberWrap), [
          label([
            input('.remember_me', {
              props: {
                type: 'checkbox',
                name: 'remember_me'
              },
              id: {
                name: 'id',
                value: 'remember_me'
              }
            }), 'Remember me'
          ]),
          button(classSet('btn btn-primary'), 'Login')
        ])
      ])
    ])
  ]);
