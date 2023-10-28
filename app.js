let form = document.querySelector("#dateForm");
let dayInput = document.querySelector("#dayInput");
let monthInput = document.querySelector("#monthInput");
let yearInput = document.querySelector("#yearInput");

let dayOutput = document.querySelector("#dayOutput");
let monthOutput = document.querySelector("#monthOutput");
let yearOutput = document.querySelector("#yearOutput");

document.querySelector(".separator").addEventListener("click", () => {
  /* Set all three as valid by default */
  dayInput.setCustomValidity("");
  monthInput.setCustomValidity("");
  yearInput.setCustomValidity("");

  let date = new Date();

  if (monthInput.value == "") {
    /* month has no value */
    monthInput.setCustomValidity("invalid");
  } else if (monthInput.value > 12 || monthInput.value < 0) {
    /* month negative value or higher than 12 */
    monthInput.setCustomValidity("invalid");
  }

  if (yearInput.value == "") {
    /* year has no value */
    yearInput.setCustomValidity("invalid");
  } else if (yearInput.value > date.getFullYear() || yearInput.value < 0) {
    /* year in the future or negative value */
    yearInput.setCustomValidity("invalid");
  }

  if (dayInput.value == "") {
    /* day has no value */
    dayInput.setCustomValidity("invalid");
  } else if (monthInput.value % 2 == 0 && dayInput.value > 30) {
    /* month has only 30 days */
    dayInput.setCustomValidity("invalid");
  } else if (monthInput.value == 2 && dayInput.value > 28) {
    /* february has only 28 days */
    dayInput.setCustomValidity("invalid");
  } else if (dayInput.value < 0 || dayInput.value > 31) {
    /* day has negative value or bigger than 31 */
    dayInput.setCustomValidity("invalid");
  }

  let userInput = new Date();
  // We need this in case year is under 100, otherwise it will be interpreted as year 1900-2000
  userInput.setFullYear(yearInput.value);
  userInput.setMonth(monthInput.value - 1);
  userInput.setDate(dayInput.value);

  if (userInput > date) {
    dayInput.setCustomValidity("invalid");
    monthInput.setCustomValidity("invalid");
    yearInput.setCustomValidity("invalid");
  }

  // If date is still flagged as valid, calculate time diff
  if (form.checkValidity()) {
    let { days, months, years } = calculateTimeSince(userInput);

    let dayCount = new CountUp("dayOutput", 0, days);
    let monthCount = new CountUp("monthOutput", 0, months);
    let yearCount = new CountUp("yearOutput", 0, years);

    dayCount.start();
    monthCount.start();
    yearCount.start();
  } else {
    // If not, just reset output date diff values
    dayOutput.innerHTML = "--";
    monthOutput.innerHTML = "--";
    yearOutput.innerHTML = "--";
  }
});

function calculateTimeSince(date) {
  const now = new Date();
  const past = new Date(date);

  let years = now.getFullYear() - past.getFullYear();
  let months = now.getMonth() - past.getMonth();
  let days = now.getDate() - past.getDate();

  if (days < 0) {
    months--;
    days += new Date(past.getFullYear(), past.getMonth() + 1, 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}
