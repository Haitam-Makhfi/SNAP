// DOM elements
const barsIcon = document.querySelector(".fa-bars");
const xmarkIcon = document.querySelector(".fa-xmark");
const aside = document.querySelector("aside");
const header = document.querySelector("header");
const plans = document.querySelectorAll(".plan");
const billingBtnsContainer = document.querySelector(".billing-type");
// implimentation variabls
const months = [
  "january",
  "febrary",
  "march",
  "april",
  "may",
  "jun",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
let requestYear;
let requestMonth;
let requestDay;
// functions
function currentDate() {
  const date = new Date();
  return {
    currentDay: date.getDate(),
    currentMonth: date.getMonth(),
    currentYear: date.getFullYear(),
  };
}
function getDefaultDate() {
  const { currentDay, currentMonth, currentYear } = currentDate();
  for (let i; i <= 60; i++) {
    requestDay = currentDay;
    requestDay--;
    const currentMonthIndex = months.findIndex(
      (month) => month == currentMonth
    );
    requestYear = currentYear;
    if (requestDay == 0) {
      requestDay = 30;
      if (currentMonthIndex == 0) {
        requestMonth = months[11];
        requestYear = currentYear - 1;
      } else {
        requestMonth = months[currentMonthIndex - 1];
      }
    }
  }
  return [requestDay, requestMonth, requestYear];
}
function changePlane() {
  billingBtnsContainer
    .querySelector(".monthly")
    .classList.add("selector-color");
  billingBtnsContainer
    .querySelector(".monthly")
    .addEventListener("click", function () {
      plans[1].querySelector("h3").innerText = "$14.99/m";
      plans[1].querySelector(".description").innerText = "Billed Monthly";
      plans[2].querySelector("h3").innerText = "$29.99/m";
      plans[2].querySelector(".description").innerText = "Billed Monthly";
      billingBtnsContainer.querySelector(".selector").style.left = "0";
      billingBtnsContainer.querySelector(".selector").style.right = "50%";
      this.classList.add("selector-color");
      billingBtnsContainer
        .querySelector(".annualy")
        .classList.remove("selector-color");
    });
  billingBtnsContainer
    .querySelector(".annualy")
    .addEventListener("click", function () {
      plans[1].querySelector("h3").innerText = "$11.99/m";
      plans[1].querySelector(".description").innerText = "Billed Yearly";
      plans[2].querySelector("h3").innerText = "$24.99/m";
      plans[2].querySelector(".description").innerText = "Billed Yearly";
      billingBtnsContainer.querySelector(".selector").style.right = "0";
      billingBtnsContainer.querySelector(".selector").style.left = "50%";
      this.classList.add("selector-color");
      billingBtnsContainer
        .querySelector(".monthly")
        .classList.remove("selector-color");
    });
}

//implimentation
barsIcon.addEventListener("click", function () {
  this.style.display = "none";
  aside.style.display = "flex";
});
xmarkIcon.addEventListener("click", function () {
  aside.style.display = "none";
  barsIcon.style.display = "block";
});
changePlane();
