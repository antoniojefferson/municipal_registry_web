/*
    Validação de numeros telefonicos;
    Referência: https://www.npmjs.com/package/validar-telefone
*/

import validator from "validar-telefone";

export default ({ app }, inject) => {
    // Inject $phoneValidation(phone) in Vue, context and store.

    inject('phoneValidation', phone => validator(phone));
}