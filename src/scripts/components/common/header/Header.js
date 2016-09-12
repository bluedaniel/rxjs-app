import h from 'snabbdom/h';
import { isEmpty } from 'lodash/fp';
import { classSet, hh } from 'core/utils';
import { link } from 'core/router';
import styles from './Header.css';
import stylesFa from 'font-awesome/css/font-awesome.css';

const { header, div, a } = hh(h);

const loggedIn = () =>
  div(classSet('right'), [
    a(classSet(stylesFa.fa, stylesFa['fa-user']), { on: {
      click: e => link('/account')
    } })
  ]);

const guest = () =>
  div(classSet('right'), [
    a(classSet(stylesFa.fa, stylesFa['fa-unlock']), { on: {
      click: e => link('/login')
    } }, '')
  ]);

export const Header = ({ state: { accountStore: { user } } }) =>
  header(classSet(styles.header), [
    div([
      a(classSet(stylesFa.fa, stylesFa['fa-home']), { on: {
        click: e => link('/')
      } })
    ]),
    isEmpty(user) ? guest() : loggedIn()
  ]);
