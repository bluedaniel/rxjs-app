import { Observable } from 'rxjs/Observable';
import snabbdom from 'snabbdom';
import h from 'snabbdom/h';
import props from 'snabbdom/modules/props';
import style from 'snabbdom/modules/style';
import eventlisteners from 'snabbdom/modules/eventlisteners';

const patch = snabbdom.init([ props, style, eventlisteners ]);

export const render = (stream$) =>
  Observable.of(document.getElementById('app'), h('div'))
    .merge(stream$)
    .pairwise()
    .subscribe(nodes => patch(...nodes));
