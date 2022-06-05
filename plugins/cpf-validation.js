/*
    Validation in cpf;
    Reference: https://github.com/carvalhoviniciusluiz/cpf-cnpj-validator#readme
*/

import { cpf as validatorCpf } from 'cpf-cnpj-validator';

export default ({ app }, inject) => {
  // Inject $cpfValidation(cpf) in Vue, context and store.
  inject('cpfValidation', cpf => validatorCpf.isValid(cpf));
}