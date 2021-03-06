/*
    Validation in birth date;
    This birth date validation follows the following parameters:
    - The date of birth cannot be greater than the current date, ie (currentDate + n).
*/

export default ({ app }, inject) => {
  // Inject $berthDateValidation(date) in Vue, context and store.

  inject('berthDateValidation', date => {
    let currentDate = new Date()
    let separator = date.substring(0, 10).replace(/\d/g, '')[0];
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

    if (new Date(`${year}/${month}/${day}`) <= currentDate) {
      validYear = true;

      leapYear = ((year % 400) == 0 || ((year % 4) == 0 && (year % 100) != 0))
      validMonth = (month > 0 && month <= 12)

      // Months with 31 days
      if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        validDay = (day > 0 && day <= 31)
      }

      // Months with 30 days
      if ([4, 6, 9, 11].includes(month)) {
        validDay = (day > 0 && day <= 30)
      }

      // February of the leap year or not
      if (month == 2) {
        let dayPlus = leapYear ? 29 : 28
        validDay = (day > 0 && day <= dayPlus)
      }

      // Checking that the calculation of years is not out of the ordinary
      validYear = (currentDate.getFullYear() - year) < 122

    }


    return (validDay && validMonth && validYear)

  });
}