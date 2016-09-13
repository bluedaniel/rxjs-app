import h from 'snabbdom/h';
import { actions } from 'actions/';
import { link } from 'core/router';
import { classSet, isEmpty, hh } from 'core/utils';
import styles from './HomeLayout.css';

const { section, div, h4, a, hr } = hh(h);

const userView = ({ displayName }) =>
  div(classSet(styles.loggedIn), [
    h4(`Welcome ${displayName}`),
    a(classSet('btn btn-primary'), { on: {
      click: e => link('/account')
    } }, 'My account')
  ]);

export const HomeLayout = ({ state: { accountStore: { user } } }) => {
  const guestView = div([
    h4('Home'),
    a(classSet('btn'), { on: {
      click: e => link('/login')
    } }, 'Login'),
    hr(''),
    a(classSet('btn'), { on: {
      click: () => actions.TOAST$.next({ message: 'Toasty message!' })
    } }, 'Show toast')
  ]);

  return div([
    section(classSet(styles.hero), [
      !user || isEmpty(user) ? guestView : userView(user)
    ])
  ]);
};
