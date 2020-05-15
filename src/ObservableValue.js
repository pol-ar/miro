import {findIndexInArr} from './utils';

class ObservableValue {
    constructor(initialValue) {
        this._value = initialValue;
        this._listeners = [];
    }

    set value(nextValue) {
        if (this._value !== nextValue) {
            this._value = nextValue;
            this._listeners.forEach(listener => {
                listener(nextValue);
            });
        }
    }

    get value() {
        return this._value;
    }

    subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Type of subscription callback is not a function!');
        }
        this._listeners.push(callback);
        return () => {
            const clbIndex = findIndexInArr(this._listeners, listener => listener === callback);
            if (clbIndex !== -1) {
                this._listeners.splice(clbIndex, 1);
            }
        };
    }
}

export default ObservableValue;