export const removeArrElAt = (arr, index) => arr.slice(0, index).concat(arr.slice(index + 1));

const EMAIL_REG_EXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const validateEmail = email => EMAIL_REG_EXP.test(String(email).toLowerCase());

export const createNodeEl = ({tag, parent, attributes = {}, ...otherProps}) => {
    const nodeEl = document.createElement(tag);
    Object.keys(attributes).forEach(attrName => {
        nodeEl.setAttribute(attrName, attributes[attrName]);
    });
    Object.keys(otherProps).forEach(propName => {
        nodeEl[propName] = otherProps[propName];
    });
    if (parent) {
        if (!(parent instanceof Node)) {
            throw new Error('Invalid parent!');
        }
        parent.appendChild(nodeEl);
    }
    return nodeEl;
};

export const isEnterKeyPressed = event => event.key === 'Enter';
export const isCommaKeyPressed = event => event.key === ',';

const trim = str => str.trim();
const isNotEmpty = str => str.length > 0;
export const parseCommaSeparatedListStr = str => str.split(',').map(trim).filter(isNotEmpty);

export const findIndexInArr = (arr, predicate) => {
    for (let i = 0, length = arr.length; i < length; i++) {
        if (predicate(arr[i], i, arr)) {
            return i;
        }
    }
    return -1;
};

export const findInArr = (arr, predicate) => {
    const foundIndex = findIndexInArr(arr, predicate);
    return foundIndex !== -1 ? arr[foundIndex] : undefined;
};

export const getArrDiff = (compareFn, prev, next) => {
    const added = next.filter(nextItem => !findInArr(prev, prevItem => compareFn(prevItem, nextItem)));
    const removed = prev.filter(prevItem => !findInArr(next, nextItem => compareFn(prevItem, nextItem)));
    return [added, removed];
};

const isNil = value => value == null;
const wrapInArray = value => Array.isArray(value) ? value : [value];
const toArray = value => isNil(value) ? [] : wrapInArray(value);
const toString = value => String(value);
export const toStringArr = value => toArray(value).map(toString);

export const htmlCollectionToArray = collection => Array.prototype.slice.call(collection);