import K from 'kefir'
import moment from 'moment'
import * as R from 'ramda';

const SPAN = 400
const DOT = `.`;
const LINE = `-`;

const getTimeEventSpace = (event) => {
    return K.fromEvents(document, event)
        .filter(event =>event.keyCode === 32)
        .skipDuplicates()
        .map(()=>moment().valueOf() )
}

const makeStore = (seed, action$) => {
    return action$
        .merge(K.constant(`.`))
        .scan((state, fn) => fn(state))
        .skipDuplicates()
}

const timedSpaceUp$  = getTimeEventSpace(`keyup`);

const timedSpaceDown$ = getTimeEventSpace(`keydown`);

const dotOrLine$ = K.combine([timedSpaceDown$, timedSpaceUp$], (a, b) => a - b)
    .skipDuplicates()
    .filter(value=>value>0)
    .map(value=>value>SPAN?(elem)=>elem+LINE:(elem)=>elem+DOT);

const state = makeStore(0,K.merge([
    dotOrLine$,
]))

state.log();
