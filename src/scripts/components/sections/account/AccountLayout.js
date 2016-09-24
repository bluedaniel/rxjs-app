import h from 'snabbdom/h';
import { hh, cx } from 'core/utils';
import { link } from 'core/router';
import styles from './AccountLayout.css';

const { section, div, h5, code, a } = hh(h);

export const AccountLayout = ({ state: { accountStore: { user } } }) =>
  div([
    section(cx(styles.wrap), [
      div([
        h5(cx(styles.h5), 'Account'),
        code(cx(styles.code), JSON.stringify(user, null, 2)),
        a(cx('btn btn-primary'), { on: {
          click: e => link('/logout')
        } }, 'Logout')
      ])
    ])
  ]);
