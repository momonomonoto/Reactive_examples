import K from 'kefir'
import * as R from 'ramda';

const createStream = () => {
    return K.sequentially(1000, [R.inc(0),R.inc(1),R.inc(2)]);
}

const createCountStreamFromEventList = (classNameIncrement,buttonDecrementClassName, counterClassName, count = 0, event='click') => {
    const observedIncrementElement =  document.querySelector(`.${classNameIncrement}`);
    const observedDecrementElement =  document.querySelector(`.${buttonDecrementClassName}`);
    const counterElement = document.querySelector(`.${counterClassName}`);

    const a = K.fromEvents(observedIncrementElement, event).scan(sum => sum + 1, 0);
    const b = K.fromEvents(observedDecrementElement, event).scan(sum => sum - 1, 0);
    a.onValue(()=>{
        ++count;
        counterElement.innerHTML = count;
    });
    b.onValue(()=>{
        --count;
        counterElement.innerHTML = count;
    });

    return count;
}

const insertDomElem = (className,tagName=`div`,text=``) => {
    const bodyElem = document.querySelector(`body`);
    bodyElem.insertAdjacentHTML("beforeEnd", `<${tagName} class=${className}>${text}</${tagName}>`);
}

const displayCountToDom = (streamOrValue,counterClassName) => {
    const counterElement = document.querySelector(`.${counterClassName}`);
    if (typeof streamOrValue === 'number'||typeof streamOrValue === 'string') {
        return counterElement.innerHTML = stream;
    }
    streamOrValue.onValue(currentCountValue => {
        counterElement.innerHTML = currentCountValue;
    });
}
const counterClassName =`counter`;
const counterPlaceClassName =`counterPlace`;
const counterStream = createStream();

const buttonIncrementClassName =`buttonIncrementClassName`;
const buttonDecrementClassName =`buttonDecrementClassName`;

insertDomElem(counterClassName);
displayCountToDom(counterStream,counterClassName);
insertDomElem(buttonIncrementClassName,`button`,`++increment`);
insertDomElem(buttonDecrementClassName,`button`,`--decrement`);
createCountStreamFromEventList(buttonIncrementClassName,buttonDecrementClassName,counterClassName);
