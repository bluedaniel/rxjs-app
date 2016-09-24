import h from 'snabbdom/h';
import { actions } from 'actions/';
import { cx, hh } from 'core/utils';
import styles from './Errors.css';

const { div, p } = hh(h);

export const Errors = ({ errorStore }) =>
  div(cx(styles.errors, { active: errorStore.errors.length }),
    errorStore.errors.map(({ message, id }) =>
      p({ on: {
        click: e => actions.ERROR_REMOVE$.next(id)
      } }, message)));
