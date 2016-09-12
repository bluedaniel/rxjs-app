import h from 'snabbdom/h';
import { compose, map } from 'lodash/fp';
import { classSet, hh } from 'core/utils';
import styles from './SearchLayout.css';

const { div, h5, p } = hh(h);

const Item = ({ name, avatar }) =>
  div(classSet(styles.item), {
    style: { backgroundImage: `url(${avatar})` }
  }, [
    p(name)
  ]);

const Container = children =>
  div([
    h5(classSet(styles.h5), 'Search'),
    div(classSet(styles.wrap), children)
  ]);

export const SearchLayout = ({ state: { searchStore: { searchResults } } }) =>
  compose(Container, map(Item))(searchResults);
