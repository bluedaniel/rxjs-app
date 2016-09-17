import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Main state stream
export const state$ = new BehaviorSubject();

// History stream for HTML5 history popstates
export const history$ = new BehaviorSubject();
