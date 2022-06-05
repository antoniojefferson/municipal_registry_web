/*
    Validation in phone number;
    Reference: https://github.com/roniemeque/validar-telefone#readme
*/

import validator from "validar-telefone";

export default ({ app }, inject) => {
  // Inject $phoneValidation(phone) in Vue, context and store.

  inject('phoneValidation', phone => validator(phone));
}