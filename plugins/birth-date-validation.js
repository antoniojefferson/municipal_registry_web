/*
    Validação de data de nascimento;
    Esta validação de data para nascimento segue os seguintes parametros:
    - Não existe uma data de nascimento maior que o momento atual ou nascimento futuro.
    - Não existe data de nascimento com mais de 122 anos.
*/

export default ({ app }, inject) => {
    // Inject $phoneValidation(phone) in Vue, context and store.

    inject('phoneValidation', phone => validator(phone));
}