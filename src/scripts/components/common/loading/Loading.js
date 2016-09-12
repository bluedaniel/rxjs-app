import h from 'snabbdom/h';
import { classSet, hh } from 'core/utils';
import styles from './Loading.css';

const { div, span } = hh(h);

export const Loading = ({ state: { globalStore } }) =>
  globalStore.loading ? div(classSet(styles.loading), [
    div(classSet(styles.spinner), [
      div(classSet(styles.bounce1)),
      div(classSet(styles.bounce2))
    ]),
    span(globalStore.loadingText)
  ]) : '';
