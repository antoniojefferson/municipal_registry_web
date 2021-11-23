/*
    Date formatting;
    Simple plugin to format date, initially working with two date formats, American YYYY MM DD and Brazilian DD MM YYYY;
*/

export default ({ app }, inject) => {
    // Inject $dateFormatting(date) in Vue, context and store.

    inject('dateFormatting', (date, separator = '-', type = 'us') => {
        let currenteparator = date.substring(0,10).replace(/\d/g, '')[0];
        let dateArray = date.split(currenteparator);
        let day, month, year, newDate;

        month = zeroLeft(parseInt(dateArray[1]))
        if (dateArray[0].length == 4) {
            year = parseInt(dateArray[0]);
            day = zeroLeft(parseInt(dateArray[2]));
        } else {
            year = parseInt(dateArray[2]);
            day = zeroLeft(parseInt(dateArray[0]));
        }


        newDate = type == 'us' ? [year, month, day].join(separator) : [day, month, year].join(separator)

        return newDate
    });

    function zeroLeft(num) {
        return num < 10 ? '0'+num : num
    }
}