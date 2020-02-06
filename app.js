let firstOperand = null
let secondOperand = null
let operator = null
let equalIsPressed = false

const DECIMAL_LIMIT = 5

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
  equalIsPressed = true
  let number = evaluateEquation(firstOperand, secondOperand)
  displayOnScreen(number.toString())
})

document.getElementById("clear-button").addEventListener("click", clearScreen)

document.getElementById("memory-store-button").addEventListener("click", function() {
  let screen = document.getElementById("calculator-screen")
  localStorage.setItem("calculator-memory", JSON.stringify(screen.value))
})

document.getElementById("memory-recall-button").addEventListener("click", function() {
  let number = localStorage.getItem("calculator-memory")
  if (number !== null && number !== ""  && equalIsPressed !== true) {setOperand(JSON.parse(number))} 
  else {return}
})

document.getElementById("memory-clear-button").addEventListener("click", function() {
  localStorage.setItem("calculator-memory", "")
})

function setOperand(number) {
  if (operator !== null) {
    secondOperand === null ? (secondOperand = number) : (secondOperand += number)
    displayOnScreen(secondOperand)
  } else {
    firstOperand === null ? (firstOperand = number) : (firstOperand += number)
    displayOnScreen(firstOperand)
  }
}

function setOperator(operatorButton) {
  let screen = document.getElementById("calculator-screen")

  if (equalIsPressed == true) {
    firstOperand = screen.value
    secondOperand = null
    equalIsPressed = false
  } else {
    if (operator !== null && firstOperand !== null && secondOperand !==null) {
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
  if (number.includes(".") && number.split(".")[1].length > DECIMAL_LIMIT) {
      number = parseFloat(number).toFixed(5)
  }
  document.getElementById("calculator-screen").value = number 
}

function clearScreen() {
  document.getElementById("calculator-screen").value = 0
  firstOperand = null
  secondOperand = null
  operator = null
  equalIsPressed = false
}