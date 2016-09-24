import h from 'snabbdom/h';
import { cx, hh } from 'core/utils';
import styles from './Toasts.css';

const { div } = hh(h);

export const Toasts = ({ toastStore }) =>
  div(cx(styles.toastsWrap, { active: toastStore.toasts.length }),
    toastStore.toasts.map(x => div(cx(styles.toastsInner), x.message)));
