import h from 'snabbdom/h';
import { actions } from 'actions/';
import { link } from 'core/router';
import { cx, isEmpty, hh } from 'core/utils';
import styles from './HomeLayout.css';

const { section, div, h4, a, hr } = hh(h);

const userView = ({ displayName }) =>
  div(cx(styles.loggedIn), [
    h4(`Welcome ${displayName}`),
    a(cx('btn btn-primary'), { on: {
      click: e => link('/account')
    } }, 'My account')
  ]);

export const HomeLayout = ({ state: { accountStore: { user } } }) => {
  const guestView = div([
    h4('Home'),
    a(cx('btn'), { on: {
      click: e => link('/login')
    } }, 'Login'),
    hr(''),
    a(cx('btn'), { on: {
      click: () => actions.TOAST$.next({ message: 'Toasty message!' })
    } }, 'Show toast')
  ]);

  return div([
    section(cx(styles.hero), [
      !user || isEmpty(user) ? guestView : userView(user)
    ])
  ]);
};
