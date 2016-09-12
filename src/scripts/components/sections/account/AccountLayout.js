import h from 'snabbdom/h';
import { hh, classSet } from 'core/utils';
import { link } from 'core/router';
import styles from './AccountLayout.css';

const { section, div, h4, a } = hh(h);

export const AccountLayout = ({ state: { accountStore: { user } } }) =>
  div([
    section(classSet(styles.wrap), [
      div([
        h4('Account'),
        a(classSet('btn btn-primary'), { on: {
          click: e => link('/logout')
        } }, 'Logout')
      ])
    ])
  ]);
