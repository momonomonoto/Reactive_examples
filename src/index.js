import K from 'kefir'
import * as R from 'ramda';

const insertDomElem = (className,tagName=`div`,text=``) => {
    const bodyElem = document.querySelector(`body`);
    bodyElem.insertAdjacentHTML("beforeEnd", `<${tagName} class=${className}>${text}</${tagName}>`);
    return document.querySelector(`.${className}`);
}
const classNameList = [`inc`,`dec`];
classNameList.forEach(className=>insertDomElem(className,`button`,className))

const incButton =  document.querySelector(`.inc`);
const decButton =  document.querySelector(`.dec`);

const inc$ = K.fromEvents(incButton, "click").map(_ => R.inc)
const dec$ = K.fromEvents(decButton, "click").map(_ => R.dec)
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
    <button type="button" class="Increment">inc</button>
    <button type="button" class="Deccrement">dec</button>
  </div>`
}

state$.onValue(state => {
    insertDomElem(`classNamePlace`,`div`).innerHTML = render(state)
})
