import K from 'kefir'
import getMilliseconds from 'date-fns/get_milliseconds'
import * as R from 'ramda';
import morse from 'morse';

const LINE_THRESHOLD_MS = 400;
const LINE_SPACE = 800;

const DOT = `.`;
const LINE = `-`;

const resultDate = getMilliseconds(new Date());
const getTimeEventSpace = (event) => {
    return K.fromEvents(document, event)
        .map(() => new Date() )
}


const makeStore = (action$) => {
    return action$
        .merge(K.constant(``))
        .scan((state, fn) =>  fn(state))
}
console.log(resultDate,'new Date()');

const getPauseObserable = (start$, end$) =>{
    return K.combine([start$, end$], (b, a) => b - a)
        .filter(ms => ms < LINE_SPACE)
        .map(ms => ms > LINE_THRESHOLD_MS ? LINE : DOT)
        .filter(Boolean);
}
const timedSpaceUp$  = getTimeEventSpace(`mousedown`);

const timedSpaceDown$ = getTimeEventSpace(`mouseup`);

let timeout$ = timedSpaceUp$.flatMapConcat(_ => K.later(DOT)).map(_ => new Date())


let pause$ = K.merge([timedSpaceDown$, timedSpaceUp$]).debounce(LINE_SPACE)


let dotOrLine$ = getPauseObserable(timedSpaceDown$,timedSpaceUp$)

const state$ = makeStore( K.merge([
    dotOrLine$.map(symbol => (state) => state + symbol),
    pause$.map(symbol => (state) => state + ' ')
]));

state$.log();
state$.onValue(state=>{
    document.body.innerHTML = state;
})
