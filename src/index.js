import K from 'kefir'
import * as R from 'ramda';
import * as D from "kefir.db"

const inc$ = K.fromEvents(document, `click`)
    .filter(event => event.target.className === `Increment`)
    .map(_ => R.inc)

const dec$ = K.fromEvents(document, `click`)
    .filter(event => event.target.className === `Deccrement`)
    .map(_ => R.dec);

const initialState$ = D.init(0);

let state$ = D.run(()=>D.makeStore({}))(initialState$,inc$,dec$).$;

let render = function (state) {
    return `<div>
    ${state} 
    <button type="button" class="Increment">increment</button>
    <button type="button" class="Deccrement">decrement</button>
  </div>`
}

state$
    .onValue(state => {
     document.body.innerHTML = render(state)
})
