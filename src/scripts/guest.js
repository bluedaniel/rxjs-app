import 'core/rxBindings';
import { state$, stateDriver, historyDriver, behaviourDriver } from 'core/drivers';
import * as guestBehaviours from 'behaviours/guestBehaviours';
import { main } from './main';
import { render } from 'core/render';
import '../styles/app.css';

const guest = true;

const DOM$ = main({
  state$,
  initState$: stateDriver(),
  history$: historyDriver(state$, guest),
  behaviours$: behaviourDriver(state$, guestBehaviours)
});

render(DOM$);
