import K from 'kefir'
import * as R from 'ramda';

const createStream = () => {
    return K.sequentially(1000, [R.inc(0),R.inc(1),R.inc(2)]);
}

const createStreamFromEvent = (className,event,initialCount = 0) => {
    const observedElement =  document.querySelector(`.${className}`);
    return  K.fromEvents(observedElement, 'click').map(event => ++initialCount);;
}

const insertDomElem = (className,tagName=`div`,text=``) => {
    const bodyElem = document.querySelector(`body`);
    bodyElem.insertAdjacentHTML("beforeEnd", `<${tagName} class=${className}>${text}</${tagName}>`);
}

const displayCountToDom = (stream,counterClassName) => {
    const counterElement = document.querySelector(`.${counterClassName}`);
    stream.onValue(currentCountValue => {
        counterElement.innerHTML = currentCountValue;
    });
}
const counterClassName =`counter`;
const counterPlaceClassName =`counterPlace`;
const counterStream = createStream();

const buttonClassName =`buttonCounter`;

insertDomElem(counterClassName);
insertDomElem(counterPlaceClassName,`div`,`incrementCounter`);
displayCountToDom(counterStream,counterClassName);
insertDomElem(buttonClassName,`button`,`click me`);
displayCountToDom(createStreamFromEvent(buttonClassName),counterPlaceClassName);
