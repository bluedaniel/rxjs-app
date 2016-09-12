import h from 'snabbdom/h';
import { hh, classSet } from 'core/utils';
import { link } from 'core/router';
import styles from './AccountLayout.css';

const { section, div, h5, code, a } = hh(h);

export const AccountLayout = ({ state: { accountStore: { user } } }) =>
  div([
    section(classSet(styles.wrap), [
      div([
        h5(classSet(styles.h5), 'Account'),
        code(classSet(styles.code), JSON.stringify(user, null, 2)),
        a(classSet('btn btn-primary'), { on: {
          click: e => link('/logout')
        } }, 'Logout')
      ])
    ])
  ]);
