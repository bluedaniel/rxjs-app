import { actions } from 'actions/';
import { routeStore } from 'stores/';

export const onRoute$ = () =>
  actions.ROUTE$.map(routeStore.setRoute);
