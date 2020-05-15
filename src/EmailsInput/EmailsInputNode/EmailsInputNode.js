import styles from './styles.css';
import {
    createNodeEl,
    getArrDiff,
    htmlCollectionToArray,
    isCommaKeyPressed,
    isEnterKeyPressed,
    parseCommaSeparatedListStr
} from '../../utils';

class EmailsInputNode {
    static checkIfElHasEmailData = (emailEl, emailData) => emailEl.getAttribute('data-email') === emailData.value;

    constructor({id = 'emails-input', parent, onDeleteEmail, onAddEmails}) {
        this._init(id, parent);
        this._onDeleteEmail = onDeleteEmail;
        this._onAddEmails = onAddEmails;
    }

    _init(id, parent) {
        this._container = createNodeEl({
            tag: 'div',
            parent: createNodeEl({
                tag: 'div',
                parent,
                id,
                className: styles['emails-input']
            }),
            className: styles['emails-input__container']
        });
        this._input = createNodeEl({
            tag: 'input',
            parent: this._container,
            className: styles['emails-input__input'],
            type: 'text',
            placeholder: 'add more people...',
            autofocus: true,
            onblur: event => this._applyInputValue(event.target.value),
            onpaste: event => {
                const pastedValue = (event.clipboardData || window.clipboardData).getData('text');
                this._applyInputValue(pastedValue);
                event.preventDefault();
            },
            onkeypress: event => {
                if (isEnterKeyPressed(event) || isCommaKeyPressed(event)) {
                    this._applyInputValue(event.target.value);
                    event.preventDefault();
                }
            }
        });
    }

    _clearInputValue() {
        this._input.value = '';
    }

    _applyInputValue(inputValue) {
        const emails = parseCommaSeparatedListStr(inputValue);
        if (emails.length > 0) {
            this._onAddEmails(emails);
        }
        this._clearInputValue();
    }

    _createEmailEl({value, valid}) {
        const emailElClasses = [
            styles['emails-input__email'],
            valid ? styles['emails-input__email--valid'] : styles['emails-input__email--invalid']
        ];
        const emailEl = createNodeEl({
            tag: 'div',
            parent: this._container,
            className: emailElClasses.join(' '),
            attributes: {'data-email': value}
        });
        createNodeEl({
            tag: 'span',
            parent: emailEl,
            className: styles['emails-input__email-value'],
            textContent: value
        });
        createNodeEl({
            tag: 'span',
            parent: emailEl,
            className: styles['emails-input__email-button'],
            textContent: '×',
            onclick: () => this._onDeleteEmail(value)
        });
        return emailEl;
    }

    _getEmailEls = () => this._container.getElementsByClassName(styles['emails-input__email']);
    _getEmailElByValue = email => this._container.querySelector(`[data-email="${email}"]`);

    _removeEmailEls = emailEls => {
        emailEls.forEach(emailEl => this._container.removeChild(emailEl));
    };

    _addEmailEls = emailsData => {
        const documentFragment = document.createDocumentFragment();
        emailsData.forEach(emailData => {
            documentFragment.appendChild(this._createEmailEl(emailData));
        });
        this._container.insertBefore(documentFragment, this._input);
    };

    _sortEmailEls = emailsData => {
        const emailElements = this._getEmailEls();
        emailsData.forEach((emailData, index) => {
            if (!EmailsInputNode.checkIfElHasEmailData(emailElements[index], emailData)) {
                this._container.insertBefore(this._getEmailElByValue(emailData.value), emailElements[index]);
            }
        });
    };

    update(emailsData) {
        const [addedEmails, removedEmails] = getArrDiff(
            EmailsInputNode.checkIfElHasEmailData,
            htmlCollectionToArray(this._getEmailEls()),
            emailsData
        );

        this._removeEmailEls(removedEmails);
        this._addEmailEls(addedEmails);
        this._sortEmailEls(emailsData);

        if (addedEmails.length > 0) {
            this._input.focus();
        }
    }
}

export default EmailsInputNode;