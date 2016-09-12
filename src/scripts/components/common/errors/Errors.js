import h from 'snabbdom/h';
import { classSet, hh } from 'core/utils';
import styles from './Errors.css';

const { div, p } = hh(h);

export const Errors = ({ errorStore }) =>
  div(classSet(styles.errors, { active: errorStore.errors.length }),
    errorStore.errors.map(x => p(x.message)));
