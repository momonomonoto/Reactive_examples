import K from 'kefir'
import * as R from 'ramda';

const createStream = () => {
    return K.sequentially(1000, [R.inc(0),R.inc(1),R.inc(2)]);
}

const insertDomElem = (className) => {
    const bodyElem = document.querySelector(`body`);
    bodyElem.insertAdjacentHTML("beforeBegin", `<div class=${className}> </div>`);
}

const displayCountToDom = (stream,counterClassName) => {
    const counterElement = document.querySelector(`.${counterClassName}`);
    stream.onValue(currentCountValue => {
        counterElement.innerHTML = currentCountValue;
    });
}
const counterClassName =`counter`;
const stream = createStream();
insertDomElem(counterClassName);
displayCountToDom(stream,counterClassName);
