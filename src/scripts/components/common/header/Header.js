import h from 'snabbdom/h';
import { classSet, isEmpty, hh } from 'core/utils';
import { link } from 'core/router';
import styles from './Header.css';
import stylesFa from 'font-awesome/css/font-awesome.css';

const { header, div, a } = hh(h);

const loggedIn = [
  div([
    a(classSet(stylesFa.fa, stylesFa['fa-search']), { on: {
      click: e => link('/search')
    } })
  ]),
  div([
    a(classSet(stylesFa.fa, stylesFa['fa-user']), { on: {
      click: e => link('/account')
    } })
  ])
];

const guest = [
  div([
    a(classSet(stylesFa.fa, stylesFa['fa-unlock']), { on: {
      click: e => link('/login')
    } }, '')
  ])
];

export const Header = ({ state: { accountStore: { user } } }) =>
  header(classSet(styles.header), [
    div([
      a(classSet(stylesFa.fa, stylesFa['fa-home']), { on: {
        click: e => link('/')
      } })
    ]),
    div([
      a(classSet(stylesFa.fa, stylesFa['fa-info-circle']), { on: {
        click: e => link('/about')
      } })
    ]),
    ...(isEmpty(user) ? guest : loggedIn)
  ]);
