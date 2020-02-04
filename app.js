let firstOperand = null
let secondOperand = null
let operator = null
let equalStatus = false

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

document.getElementById("equal-button").addEventListener("click", function() {
  equalStatus = true
  displayOnScreen(evaluateEquation(firstOperand, secondOperand))
})

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
  if (equalStatus == true) {
    let screen = document.getElementById("calculator-screen")
    firstOperand = screen.value
    secondOperand = null
    equalStatus = false
  } else {
    if (operator !== null && firstOperand !== null) {
      let screen = document.getElementById("calculator-screen")
      firstOperand = evaluateEquation(firstOperand, screen.value)
      secondOperand = null
      displayOnScreen(firstOperand)
    }
  }
  operator = operatorButton.getAttribute("data-operator")
}

function appendDecimal() {
  let screen = document.getElementById("calculator-screen")
  if (screen.value.includes(".")) {return} 
  else {
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

function evaluateEquation(numA, numB) {
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
  equalStatus = false
}