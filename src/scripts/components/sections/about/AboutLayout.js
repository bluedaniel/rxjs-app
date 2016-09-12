import h from 'snabbdom/h';
import { classSet, hh } from 'core/utils';
import styles from './AboutLayout.css';

const { section, div, h3 } = hh(h);

export const AboutLayout = () =>
  section(classSet(styles.hero), [ div([ h3('About us!') ]) ]);
