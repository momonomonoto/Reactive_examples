import K from 'kefir'
import * as R from 'ramda';

const body = document.querySelector(`body`);

const inc$ = K.fromEvents(body, `click`)
    .filter(event => event.target.className === `Increment`)
    .map(_ => R.inc)

const dec$ = K.fromEvents(body, `click`)
    .filter(event => event.target.className === `Deccrement`)
    .map(_ => R.dec)

let makeStore = function (seed, action$) {
    return action$
        .merge(K.constant(seed))
        .scan((state, fn) => fn(state))
        .skipDuplicates()
}

let state$ = makeStore(0,K.merge([
    inc$,
    dec$
]))


let render = function (state) {
    return `<div>
    ${state} 
    <button type="button" class="Increment">increment</button>
    <button type="button" class="Deccrement">decrement</button>
  </div>`
}

state$
    .onValue(state => {
    body.innerHTML = render(state)
})
