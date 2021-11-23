/*
    Validation in email;
    Reference: https://github.com/manishsaraan/email-validator
*/

import * as EmailValidator from 'email-validator';

export default ({ app }, inject) => {
    // Inject $emailValidation(email) in Vue, context and store.

    inject('emailValidation', email => EmailValidator.validate(email));    
}