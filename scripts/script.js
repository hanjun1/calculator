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
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "Something has gone terribly wrong!";
  }
}

function updateDisplayNumber(e) {
  if (isIteration) {
    valuesStored = {};
    isIteration = false;
  }
  if (exceedsTenDigits() && !clearDisplay) {
    return;
  }
  if (e === ".") {
    if (decimalExists()) {
      return;
    }
  }
  operatorClicked = false;
  if (clearDisplay && e !== ".") {
    displayValue.textContent = e;
    if (e === "0") {
      return;
    }
  } else if (clearDisplay && e === ".") {
    displayValue.textContent = "0."
  } else {
    displayValue.textContent += e;
  }
  clearDisplay = false;
  
}

let numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
  number.addEventListener("click", (e) => updateDisplayNumber(e.target.value));
});

function calculate() {
  let num1 = parseFloat(valuesStored["num1"]);
  let num2 = parseFloat(valuesStored["num2"]);
  let operator = valuesStored["operator"];
  let result = operate(operator, num1, num2);
  result = Math.round((result + Number.EPSILON) * 100000000) / 100000000;
  if (result.toString().length > 8) {
    return result.toExponential(4);
  }
  return result
}

function updateDisplayOperator(e) {
  if (isIteration) {
    valuesStored["num1"] = displayValue.textContent;
    isIteration = false;
  }
  if (operatorClicked) {
    valuesStored["operator"] = e;
    return;
  }
  if (!valuesStored.hasOwnProperty("num1")) {
    valuesStored["num1"] = displayValue.textContent;
  } else {
    valuesStored["num2"] = displayValue.textContent;
    let result = calculate();
    displayValue.textContent = result;
    valuesStored["num1"] = result;
  }
  valuesStored["operator"] = e;
  clearDisplay = true;
  operatorClicked = true;
}

function addOperatorClick(e) {
  clearOperatorClick();
  e.target.classList.add("operator-click");
}

function clearOperatorClick() {
  let operatorClicked = document.querySelector(".operator-click");
  if (operatorClicked !== null) {
    operatorClicked.classList.remove("operator-click");
  }
}

let operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    addOperatorClick(e);
    updateDisplayOperator(e.target.value);
  });
});

function showResult(e) {
  clearOperatorClick();
  if (!valuesStored.hasOwnProperty("num1")) {
    return;
  }
  if (!isIteration) {
    valuesStored["num2"] = displayValue.textContent;
    isIteration = true;
  }
  let result = calculate();
  displayValue.textContent = result;
  valuesStored["num1"] = displayValue.textContent;
  clearDisplay = true;
  operatorClicked = true;
}

let equals = document.querySelector("#equals");
equals.addEventListener("click", showResult);

function clearAllResults(e) {
  clearOperatorClick();
  valuesStored = {};
  displayValue.textContent = 0;
  clearDisplay = true;
}

let clearAll = document.querySelector("#all-clear");
clearAll.addEventListener("click", clearAllResults);

function clearResult(e) {
  clearOperatorClick();
  displayValue.textContent = 0;
  clearDisplay = true;
}

let clear = document.querySelector("#clear");
clear.addEventListener("click", clearResult);

function removeChar(e) {
  if (operatorClicked) {
    return;
  }
  if (displayValue.textContent === "0") {
    return;
  }
  if (displayValue.textContent.length === 1) {
    displayValue.textContent = 0;
  } else {
    let newDisplayArr = displayValue.textContent.split("");
    newDisplayArr.pop();
    displayValue.textContent = newDisplayArr.join("");
  }
  clearDisplay = true;
}

let backspace = document.querySelector("#backspace");
backspace.addEventListener("click", removeChar);

function addPlusMinus(e) {
  let displayArr = displayValue.textContent.split("");
  if (negativeExists()) {
    displayArr.shift();
    displayValue.textContent = displayArr.join("");
  } else {
    displayArr.unshift("-");
    displayValue.textContent = displayArr.join("");
  }
}

let plusMinus = document.querySelector("#plus-minus");
plusMinus.addEventListener("click", addPlusMinus);


// keyboard compatibility
function keyboardAction(e) {
  switch (e.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
    case ".":
      updateDisplayNumber(e.key);
      break;
    case "Backspace":
      removeChar(e.key);
      break;
    case "/":
    case "*":
    case "-":
    case "+":
      updateDisplayOperator(e.key);
      break;
    case "Enter":
      showResult(e.key);
      break;
  }
}

document.addEventListener("keydown", keyboardAction);

// Boolean Checks

// checks if decimal is already in display
function decimalExists() {
  let display = displayValue.textContent;
  if (display.indexOf(".") < 0) {
    return false;
  }
  return true;
}

// checks if display is more than 10 characters
function exceedsTenDigits() {
  let display = displayValue.textContent;
  if (display.length > 10) {
    return true;
  }
  return false;
}

//check if negative symbol is already in display
function negativeExists() {
  let display = displayValue.textContent;
  if (display.indexOf("-") < 0) {
    return false;
  }
  return true;
}
