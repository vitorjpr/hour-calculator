let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetScreen = false;
let display = document.getElementById("display");

// Carrega o último resultado do localStorage
window.onload = function () {
  if (localStorage.getItem("lastResult")) {
    display.innerText = localStorage.getItem("lastResult");
    firstOperand = localStorage.getItem("lastResult");
  }
};

function appendNumber(number) {
  if (shouldResetScreen) resetScreen();
  display.innerText += number;
}

function appendUnit(unit) {
  display.innerText += unit;
}

function setOperator(operator) {
  if (currentOperator !== null) calculate();
  firstOperand = display.innerText;
  currentOperator = operator;
  shouldResetScreen = true;
}

function calculate() {
  if (currentOperator === null || shouldResetScreen) return;
  secondOperand = display.innerText;
  let result = operate(currentOperator, firstOperand, secondOperand);
  display.innerText = formatTime(result);
  localStorage.setItem("lastResult", formatTime(result));
  firstOperand = result;
  currentOperator = null;
  shouldResetScreen = true;
}

function clearDisplay() {
  display.innerText = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
  localStorage.setItem("lastResult", "0");
}

function resetScreen() {
  display.innerText = "0";
  shouldResetScreen = false;
}

function operate(operator, a, b) {
  let timeA = parseTime(a);
  let timeB = parseTime(b);
  let result;
  switch (operator) {
    case "+":
      result = timeA + timeB;
      break;
    case "-":
      result = timeA - timeB;
      break;
    default:
      return null;
  }
  return result;
}

function parseTime(timeStr) {
  let totalMinutes = 0;
  let match;
  match = timeStr.match(/(\d+)h/);
  if (match) totalMinutes += parseInt(match[1]) * 60;
  match = timeStr.match(/(\d+)m/);
  if (match) totalMinutes += parseInt(match[1]);
  return totalMinutes;
}

function formatTime(totalMinutes) {
  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;
  if (minutes === 0) {
    return `${hours}h`;
  }
  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h${minutes}m`;
}
