/*
    Validação de data de nascimento;
    Esta validação de data para nascimento segue os seguintes parametros:
    - A data de nascimento não podera ser maior que a data atual, ou seja (currentDate + n) .
    - A data não poderá ser com a quantidade em anos maior que 122, pois 122 é maior tempo de vida já registrado na historia.
*/

export default ({ app }, inject) => {
    // Inject $berthDateValidation(date) in Vue, context and store.

    inject('berthDateValidation', date => {
        let currentDate = new Date()
        let separator = date.substring(0,10).replace(/\d/g, '')[0];
        let dateArray = date.split(separator);
        let day, month, year, leapYear, validDay = false, validMonth = false, validYear = false;

        month = parseInt(dateArray[1]) 
        if (dateArray[0].length == 4) {
            year = parseInt(dateArray[0]);
            day = parseInt(dateArray[2]);
        } else {
            year = parseInt(dateArray[2]);
            day = parseInt(dateArray[0]);
        }


        if (year <= currentDate.getFullYear() && day <= currentDate.getDate() && month <= (currentDate.getMonth()+1)) {
            validYear = true;

            leapYear = ((year % 400) == 0 || ((year % 4) == 0 && (year % 100) != 0)) 
            validMonth =  (month > 0 && month <= 12)

            // Meses com 31 dias
            if([1,3,5,7,8,10,12].includes(month)) {
                validDay = (day > 0 && day <= 31)
            }

            // Meses com 30 dias
            if([4,6,9,11].includes(month)) {
                validDay = (day > 0 && day <= 30)
            }

            // Fevereiro do ano bissexto ou não
            if (month == 2) {
                let dayPlus = leapYear ? 29 : 28
                validDay = (day > 0 && day <= dayPlus)
            }

            // Vericando se o calculo de anos não está fora do comun
            validYear = (currentDate.getFullYear() - year) < 122

        }


        return (validDay && validMonth && validYear)
        
    });
}