import h from 'snabbdom/h';
import { cx, hh } from 'core/utils';
import styles from './Loading.css';

const { div, span } = hh(h);

export const Loading = ({ state: { globalStore } }) =>
  globalStore.loading ? div(cx(styles.loading), [
    div(cx(styles.spinner), [
      div(cx(styles.bounce1)),
      div(cx(styles.bounce2))
    ]),
    span(globalStore.loadingText)
  ]) : '';
