import {findInArr, findIndexInArr, removeArrElAt, validateEmail} from '../utils';

const SET_EMAILS = 'SET_EMAILS';
const ADD_EMAILS = 'ADD_EMAILS';
const DELETE_EMAIL = 'DELETE_EMAIL';

const buildEmailsData = emails => emails.map((email) => ({
    value: email,
    valid: validateEmail(email)
}));

export const actions = {
    SET_EMAILS: emails => ({
        type: SET_EMAILS,
        emails: buildEmailsData(emails)
    }),
    ADD_EMAILS: emails => ({
        type: ADD_EMAILS,
        emails: buildEmailsData(emails)
    }),
    DELETE_EMAIL: email => ({
        type: DELETE_EMAIL,
        email
    })
};

const addEmailData = (state, emailData) => {
    const alreadyExists = !!findInArr(state, email => email.value === emailData.value);
    return alreadyExists ? state : state.concat(emailData);
};

export default function reducer(state = [], action) {
    switch (action.type) {
        case SET_EMAILS: {
            return action.emails.reduce((acc, email) => addEmailData(acc, email), []);
        }
        case ADD_EMAILS: {
            return action.emails.reduce((acc, email) => addEmailData(acc, email), state);
        }
        case DELETE_EMAIL: {
            const emailIndex = findIndexInArr(state, email => email.value === action.email);
            return emailIndex !== -1 ? removeArrElAt(state, emailIndex) : state;
        }
        default:
            return state;
    }
}

export const getValidEmails = (state) => getEmails(state.filter(email => email.valid));

export const getEmails = state => state.map(email => email.value);