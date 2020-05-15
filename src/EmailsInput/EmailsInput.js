import ObservableValue from '../ObservableValue';
import stateReducer, {actions, getEmails, getValidEmails} from './stateReducer';
import EmailsInputNode from './EmailsInputNode/EmailsInputNode';
import {parseCommaSeparatedListStr, toStringArr} from '../utils';

class EmailsInput {
    static sanitizeEmailsList(emails) {
        return typeof emails === 'string'
            ? parseCommaSeparatedListStr(emails)
            : toStringArr(emails);
    }

    constructor({id, parent}) {
        this._inputNode = new EmailsInputNode({
            id,
            parent,
            onDeleteEmail: this._deleteEmail,
            onAddEmails: this._addEmails
        });

        this._state = new ObservableValue([]);
        this._state.subscribe(newState => {
            this._inputNode.update(newState);
        });
    }

    _addEmails = emails => {
        this._changeState(actions.ADD_EMAILS(emails));
    };

    _deleteEmail = email => {
        this._changeState(actions.DELETE_EMAIL(email));
    };

    _changeState(action) {
        this._state.value = stateReducer(this._state.value, action);
    }

    set emails(emails) {
        this._changeState(actions.SET_EMAILS(EmailsInput.sanitizeEmailsList(emails)));
    }

    get emails() {
        return getEmails(this._state.value);
    }

    get validEmails() {
        return getValidEmails(this._state.value);
    }

    subscribe(callback) {
        return this._state.subscribe(callback);
    }
}

export default EmailsInput;