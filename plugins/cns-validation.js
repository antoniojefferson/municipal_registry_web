/*
    CNS validation using e-SUS rules;
    Reference: https://integracao.esusab.ufsc.br/ledi/documentacao/regras/algoritmo_CNS.html

    Obs: Compressed algorithms, but following the rules established in the reference above.
*/
export default ({ app }, inject) => {
    // Inject $cnsValidation(cns) in Vue, context and store.

    inject('cnsValidation', cns => {
        let numCns = cns.replace(/\D/g, '');

        if (numCns.length != 15) {
            return false;
        }

        let sum = 0, rest, division, pis, result;

        // Validate CNS
        if ( [1,2].includes(parseInt(numCns.substring(0,1))) ) {
            pis = numCns.substring(0,11);

            for(var i = 0; i < 11; i++) {
                sum += parseInt(pis.substring(i, (i + 1)) * (15 - i));
            }
            
            rest = sum % 11;
            division = 11 - rest;
            
            if (division == 11){
                division = 0;
            }

            if (division == 10){
                
                for(var i = 0; i < 11; i++) {
                    sum += parseInt(pis.substring(i, (i + 1)) * (15 - i)) + ((15 - i) == 5 ? 2 : 0);
                }

                rest = sum % 11;
                division = 11 - rest;
                result = pis + '001' + division.toString();
            } else{
                result = pis + "000" + division.toString();
            }

            if (!(numCns == result)){
                return false;
            } else{
                return true;
            }
        }

        // Validate CNS Prov
        if ( [7,8,9].includes(parseInt(numCns.substring(0,1))) ) {
            
            for(var i = 0; i < 15; i++) {
                sum += parseInt(numCns.substring(i, (i + 1)) * (15 - i));
            }
            
            rest = sum % 11;

            if (rest != 0){
                return false;
            } else{
                return true;
            }
        }
    });
}