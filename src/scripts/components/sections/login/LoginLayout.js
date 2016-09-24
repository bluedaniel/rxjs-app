import h from 'snabbdom/h';
import { cx, hh } from 'core/utils';
import { actions } from 'actions';
import styles from './LoginLayout.css';

const { section, div, h4, form, input, button, label, p } = hh(h);

export const LoginLayout = () =>
  section(cx(styles.loginWrap), [
    div([
      h4('Login'),
      form({ on: {
        submit: e => actions.LOGIN$.next(e)
      } }, [
        input(cx('username'), {
          props: {
            placeholder: 'Username',
            type: 'text',
            value: 'daniel'
          }
        }),
        input(cx('password'), {
          props: {
            placeholder: 'Password',
            type: 'password',
            value: 'password'
          }
        }),
        p(cx(styles.rememberWrap), [
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
          button(cx('btn btn-primary'), 'Login')
        ])
      ])
    ])
  ]);
