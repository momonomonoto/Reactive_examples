import K from 'kefir'
import getMilliseconds from 'date-fns/get_milliseconds'
import * as R from 'ramda';
import morse from 'morse';

const LINE_THRESHOLD_MS = 400;
const DOT = `.`;
const LINE = `-`;

const resultDate = getMilliseconds(new Date());
const getTimeEventSpace = (event) => {
    return K.fromEvents(document, event)
        .filter(event => event.keyCode === 32)
        .map(() => getMilliseconds(new Date()) )
}

const makeStore = (action$) => {
    return action$
        .merge(K.constant(``))
        .scan((state, fn) =>  fn(state))
        .take(3)
}
console.log(resultDate,'new Date()');
const timedSpaceUp$  = getTimeEventSpace(`keyup`);

const timedSpaceDown$ = getTimeEventSpace(`keydown`);

let dotOrLine$ = K.combine([timedSpaceDown$, timedSpaceUp$], (a, b) => a - b)
    .filter(ms => ms > 0)
    .map(ms => ms > LINE_THRESHOLD_MS ? LINE : DOT);

const state$ = makeStore( K.merge([
    dotOrLine$
        .map(symbol => (state) => state + symbol)
]));

state$.onValue(state=>{
    const resultSymbol = state.map(elemState=>morse.decode(elemState));
    document.body.innerHTML = resultSymbol.join('');
})
