let displayValue = document.querySelector("#value");
let valuesStored = {};
let clearDisplay = true;
let operatorClicked = false;
let isIteration = false;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "ERROR DIV BY 0";
  }
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "add":
      return add(num1, num2);
    case "subtract":
      return subtract(num1, num2);
    case "multiply":
      return multiply(num1, num2);
    case "divide":
      return divide(num1, num2);
    default:
      return "Something has gone terribly wrong!";
  }
}

function updateDisplayNumber(e) {
  if(isIteration) {
    valuesStored = {};
    isIteration = false;
  }
  operatorClicked = false;
  if (clearDisplay) {
    displayValue.textContent = e.target.value;
    if (e.target.value == 0) {
      return;
    }
    clearDisplay = false;
  } else {
    displayValue.textContent += e.target.value;
  }
}

let numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
  number.addEventListener("click", updateDisplayNumber);
});

function calculate() {
    let num1 = parseInt(valuesStored['num1']);
    let num2 = parseInt(valuesStored['num2']);
    let operator = valuesStored['operator'];
    return operate(operator, num1, num2);
}

function updateDisplayOperator(e) {
  if (isIteration) {
    valuesStored['num1'] = displayValue.textContent;
    isIteration = false;
  }
  if (operatorClicked) {
    valuesStored['operator'] = e.target.value;
    return;
  }
  if (!valuesStored.hasOwnProperty('num1')) {
    valuesStored['num1'] = displayValue.textContent;
  } else {
    valuesStored['num2'] = displayValue.textContent;
    let result = calculate();
    displayValue.textContent = result;
    valuesStored['num1'] = result;
  }
  valuesStored['operator'] = e.target.value;
  clearDisplay = true;
  operatorClicked = true;
}

let operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
  operator.addEventListener("click", updateDisplayOperator);
});

function showResult(e) {
  if (!valuesStored.hasOwnProperty('num1')) {
    return;
  }
  if (!isIteration) {
    valuesStored['num2'] = displayValue.textContent;
    isIteration = true;
  }
  let result = calculate();
  displayValue.textContent = result;
  valuesStored['num1'] = displayValue.textContent;
  clearDisplay = true;
  operatorClicked = true;
}

let equals = document.querySelector("#equals");
equals.addEventListener("click", showResult);

function clearAllResults(e) {
  valuesStored = {};
  displayValue.textContent = 0;
  clearDisplay = true;
}

let clearAll = document.querySelector("#all-clear");
clearAll.addEventListener("click", clearAllResults);

function clearResult(e) {
  displayValue.textContent = 0;
  clearDisplay = true;
}

let clear = document.querySelector("#clear");
clear.addEventListener("click", clearResult);
