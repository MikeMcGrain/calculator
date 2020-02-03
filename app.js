let firstOperand = null
let secondOperand = null
let operator = null

// add listeners to number buttons
let numberButtons = document.getElementsByClassName("number-button")
for (let numberButton of numberButtons) {
  numberButton.addEventListener("click", function() {setOperand(numberButton.innerText)})
}

// add listeners to operator buttons
let operatorButtons = document.getElementsByClassName("operator-button")
for (let operatorButton of operatorButtons) {
  operatorButton.addEventListener("click", function() {setOperator(operatorButton)})
}

document.getElementById("decimal-button").addEventListener("click", appendDecimal)

document.getElementById("equal-button").addEventListener("click", evaluateEquation)

document.getElementById("clear-button").addEventListener("click", clearScreen)

function setOperand(number) {
  if (operator !== null) {
    secondOperand = setOperandSub(secondOperand, number)
    displayOnScreen(secondOperand)
  } else {
    firstOperand = setOperandSub(firstOperand, number)
    displayOnScreen(firstOperand)
  }
}

function setOperandSub(operand, number) {
  operand === null ? (operand = number) : (operand += number)
  return operand
}

function setOperator(operatorButton) {
    if (operator !== null && firstOperand !== null) {
      let screen = document.getElementById("calculator-screen")
      firstOperand = anotherEval(firstOperand, screen.value)
      secondOperand = null
      console.log(firstOperand)
      console.log(secondOperand)
      console.log(operator)
    }
    operator = operatorButton.getAttribute("data-operator")
}

function appendDecimal() {
  let screen = document.getElementById("calculator-screen")
  if (screen.value.includes(".")) {
    return
  } else {
    switch (operator) {
      case null:
        firstOperand += "."
        displayOnScreen(firstOperand)
        break
      default:
        secondOperand += "."
        displayOnScreen(secondOperand)
    }
  }
}

function evaluateEquation() {
  firstOperand = parseFloat(firstOperand)
  secondOperand = parseFloat(secondOperand)

  switch (operator) {
    case "divide": displayOnScreen(firstOperand / secondOperand); break
    case "times": displayOnScreen(firstOperand * secondOperand); break
    case "minus": displayOnScreen(firstOperand - secondOperand); break
    case "plus": displayOnScreen(firstOperand + secondOperand); break
  }
}

function anotherEval(numA, numB) {
  numA = parseFloat(numA)
  numB = parseFloat(numB)

  switch (operator) {
    case "divide": return numA / numB; break
    case "times": return numA * numB; break
    case "minus": return numA - numB; break
    case "plus": return numA + numB; break
  }
}

function displayOnScreen(number) {
  document.getElementById("calculator-screen").value = number
}

function clearScreen() {
  document.getElementById("calculator-screen").value = 0
  firstOperand = null
  secondOperand = null
  operator = null
}
