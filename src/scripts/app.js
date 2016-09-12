import 'core/rxBindings';
import { state$, stateDriver, behaviourDriver, historyDriver } from 'core/drivers';
import * as behaviours from 'behaviours/';
import * as guestBehaviours from 'behaviours/guestBehaviours';
import { main } from './main';
import { render } from 'core/render';
import '../styles/app.css';

const guest = false;

const DOM$ = main({
  state$,
  initState$: stateDriver(),
  history$: historyDriver(state$, guest),
  behaviours$: behaviourDriver(state$, { ...guestBehaviours, ...behaviours })
});

render(DOM$);
