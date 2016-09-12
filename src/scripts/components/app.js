import h from 'snabbdom/h';
import { Toasts, Errors, Header, Loading } from 'components/common';
import { hh } from 'core/utils';

const { div } = hh(h);

export const App = ({ view, state }) =>
  div('.page', [
    Loading({ state }),
    Header({ state }),
    Errors({ errorStore: state.errorStore }),
    Toasts({ toastStore: state.toastStore }),
    view({ state })
  ]);
