# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![](./mobile.jpeg)
![](./desktop.jpeg)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [CountUp.js](https://inorganik.github.io/countUp.js/) - For animating the numbers count up

### What I learned

This was a bit unexpected, had to deal with some surprises coming from the JS date handling. For instance I discovered that if you use the default Date constructor to initialize a date, and years are under 100, the resulting date will be in the 1900s instead of 0-100s. A call to SetFullYear is required in order to properly set it.

Also it was the first time I was integrating a library from a CDN, which had me understand how I should properly invoke it (by knowing the exported objects attached to the global scope).

Then, at first I wanted to just use JS to modify appearance of invalid elements, but I found pseudoelements more convenient. The validation message is rendered using an ::after pseudoelement combined with the :invalid selector. So the element containing it only shows up when the input is invalid (The invalidity is set programatically with JS)

```js
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
```

Also, I found easier to use a simple library to animate the numbers count up. I'm adding the CountUp.js library via CDN.
