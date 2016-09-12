import h from 'snabbdom/h';
import { classSet, hh } from 'core/utils';
import styles from './Toasts.css';

const { div } = hh(h);

export const Toasts = ({ toastStore }) =>
  div(classSet(styles.toastsWrap, { active: toastStore.toasts.length }),
    toastStore.toasts.map(x => div(classSet(styles.toastsInner), x.message)));
