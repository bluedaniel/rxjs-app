import { DOM$ } from 'core/sinks';

export const main = ({ state$, initState$, history$, behaviours$ }) => {
  // Subscribe to all side effects once initial state emits
  initState$.subscribe(initState => {
    state$.next(initState);
    behaviours$.subscribe(a => state$.next(a));
    history$.subscribe(fn => fn());
  });

  return DOM$(state$);
};
