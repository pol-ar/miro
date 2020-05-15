# Miro test
Miro [frontend test task](https://docs.google.com/document/d/1VGyYpWzPyaAnJAesaM2I_3ly8s1Tbjf8_tOsML1zGx8/edit) implementation.

### Install dependencies
`npm install `

### Start project
`npm start`

### Production build
`npm run build`

## EmailsInput
Reusable component for handling adding/deleting emails. List of emails can't contain duplicate values.

### Usage
To use EmailsInput add emails-input.js script to your html page and create instance of EmailsInput class.
#### Example
```html
<script src="emails-input.js"></script>
<script>
    var inputContainerNode = document.querySelector('#emails-input-container');
    var emailsInput = new EmailsInput({id: 'emails-input', parent: inputContainerNode});
    ....
```
#### EmailsInput constructor options
* id - value of id attribute for input element
* parent - parent node for input element

## EmailsInput instance public API

### emails
The emails property of the EmailsInput interface gets and sets the list of email values.
Set property can accept array of strings, comma-separated string of values, null, undefined.
All other types of values will be coerced to array of strings.
#### Example
```javascript
    emailsInput.emails = ['1@miro.com', '2@miro.com'];
    console.log(emailsInput.emails); // ['1@miro.com', '2@miro.com']

    emailsInput.emails = '1@miro.com, 2@miro.com';
    console.log(emailsInput.emails); // ['1@miro.com', '2@miro.com']

    emailsInput.emails = null;
    console.log(emailsInput.emails); // []

    emailsInput.emails = 1;
    console.log(emailsInput.emails); // ['1']
```

### validEmails
The validEmails read-only property returns the number of valid emails in the input.

#### Example
```javascript
    emailsInput.emails = ['1@miro.com', '1'];
    console.log(emailsInput.validEmails); // 1

    emailsInput.emails = [];
    console.log(emailsInput.validEmails); // 0
```

### subscribe()
The subscribe() method adds listener to input values changes event. Return value is a function to unsubscribe.

#### Example
```javascript
    var unsubscribe = emailsInput.subscribe(function() {
        console.log('Values changed');
    });

    emailsInput.emails = ['1@miro.com'];  //console: Values changed
    unsubscribe();
    emailsInput.emails = [];  //console: <empty>
```

