let displayValue = document.querySelector("#display");
let valuesStored = [];
let clearDisplay = true;
let operatorsList = ["add", "subtract", "multiply", "divide"];

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
  if (clearDisplay) {
    if (e.target.value == 0) {
      return;
    }
    displayValue.textContent = e.target.value;
    clearDisplay = false;
  } else {
    displayValue.textContent += e.target.value;
  }
}

let numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
  number.addEventListener("click", updateDisplayNumber);
});

function updateDisplayOperator(e) {
//   if (operatorsList.includes(valuesStored[1])) {
//     valuesStored.pop();
//     valuesStored.push(e.target.value);
//     return;
//   }
  let num1 = parseInt(valuesStored.shift());
  if (isNaN(num1)) {
    valuesStored.push(displayValue.textContent);
  } else {
    let num2 = parseInt(displayValue.textContent);
    let operator = valuesStored.pop();
    let result = operate(operator, num1, num2);
    displayValue.textContent = result;
    valuesStored.push(result);
  }
  valuesStored.push(e.target.value);
  clearDisplay = true;
}

let operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
  operator.addEventListener("click", updateDisplayOperator);
});

function showResult(e) {
  let num1 = parseInt(valuesStored.shift());
  let operator = valuesStored.pop();
  let num2 = parseInt(displayValue.textContent);
  let result = operate(operator, num1, num2);
  displayValue.textContent = result;
  clearDisplay = true;
}

let equals = document.querySelector("#equals");
equals.addEventListener("click", showResult);

function clearAllResults(e) {
  valuesStored = [];
  display.textContent = 0;
  clearDisplay = true;
}

let clearAll = document.querySelector("#all-clear");
clearAll.addEventListener("click", clearAllResults);

function clearResult(e) {
  display.textContent = 0;
  clearDisplay = true;
}

let clear = document.querySelector("#clear");
clear.addEventListener("click", clearResult);
