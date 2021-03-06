import h from 'snabbdom/h';
import { actions } from 'actions/';
import { cx, hh, compose, map } from 'core/utils';
import styles from './SearchLayout.css';

const { div, h5, p, a } = hh(h);

const Item = ({ name, picture }) => {
  return div(cx(styles.item), [
    h(`img.${styles.img}`, {
      props: { src: picture }
    }, 'ss'),
    p(name)
  ]);
};

const Container = children =>
  div([
    h5(cx(styles.h5), 'Search'),
    p(cx(styles.tagline), 'This is an authorised route.'),
    a(cx(styles.fetchError, 'btn'), { on: {
      click: e => actions.SEARCH$.next({ params: [ 'error', '' ] })
    } }, 'Example error from fetch'),
    div(cx(styles.wrap), children)
  ]);

export const SearchLayout = ({ state: { searchStore: { searchResults } } }) =>
  compose(Container, map(Item))(searchResults);
