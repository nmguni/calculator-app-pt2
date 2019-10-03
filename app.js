// storing values
class Calculator {
  // where to place our display text
  constructor(previousOperandTextElement, currentOperandTExtElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTExtElement = currentOperandTExtElement;
    // call clear all inputs to defalut
    this.clear();
  }

  clear() {
    // remove prevous, current, operation
    this.currentOperand = "";
    this.previousOperand = "";
    // no operatons selected when cleared
    this.operaton = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // when a number is clicked it will be added to the screen
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  //  when operation * - / s clicked
  chooseOperation(operaton) {
    if (this.currentOperand === "") return;
    if (this.previousOperand != "") {
      this.compute();
    }
    this.operaton = operaton;
    this.previousOperand = this.currentOperand;
    this.currentOperand = " ";
  }

  // take values and compute a single value to be displayed
  compute() {
    let computation;
    // const sciCalc = mathPI.value;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operaton) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "π":
        computation = prev * current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operaton = undefined;
    this.previousOperand = "";
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split("."));
    const decimalDigits = stringNumber.split(".")[1];
    let intigetDsplay;
    if (isNaN(integerDigits)) {
      intigetDsplay = "";
    } else {
      intigetDsplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${intigetDsplay}.${decimalDigits}`;
    } else {
      return intigetDsplay;
    }
  }

  // update or values inside output
  updateDisplay() {
    this.currentOperandTExtElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operaton != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operaton}`;
    } else {
      this.previousOperandTextElement.innerText = " ";
    }
  }
}
// const mathPI = document.getElementById("btnPi");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButtons = document.querySelector("[data-equals]");
const deleteButtons = document.querySelector("[data-delete]");
const allClearButtons = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous]");
const currentOperandTExtElement = document.querySelector("[data-current]");

// create a calculator
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTExtElement
);

// loop thru btns and add click event. add number thats inside of button
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// operation button
operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

allClearButtons.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButtons.addEventListener("click", button => {
  calculator.delete();
  calculator.updateDisplay();
});

// sc functions --------------------

function sqrRoot() {
  // grab number from display
  let num = parseInt(currentOperandTExtElement.innerText);
  //  compute number
  let answer = Math.sqrt(num);
  // click = and add answer to current operand
  equalsButtons.addEventListener("click", button => {
    currentOperandTExtElement.innerHTML = answer.toString();
  });
}
function cosCalc() {
  // grab number from display
  let num = parseInt(currentOperandTExtElement.innerText);
  //  compute number
  let answer = Math.cos(num);
  // let finalA = answer.toExponential();
  // click = and add answer to current operand
  equalsButtons.addEventListener("click", button => {
    currentOperandTExtElement.innerHTML = answer.toString();
  });
}

function tanCalc() {
  // grab number from display
  let num = parseInt(currentOperandTExtElement.innerText);
  //  compute number
  let answer = Math.tan(num);
  // let finalA = answer.toExponential();
  // click = and add answer to current operand
  equalsButtons.addEventListener("click", button => {
    currentOperandTExtElement.innerHTML = answer.toString();
  });
}

function atanCalc() {
  // grab number from display
  let num = parseInt(currentOperandTExtElement.innerText);
  //  compute number
  let answer = Math.atan(num);

  // click = and add answer to current operand
  equalsButtons.addEventListener("click", button => {
    currentOperandTExtElement.innerHTML = answer.toString();
  });
}
// scientific notation function
// function scientificNotation(x,f) {
// return Number.parseFloat(x).toExponential(f)
// }
