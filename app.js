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

// add listener to M+
let mPlusButton = document.getElementById("memory-store-button")
mPlusButton.addEventListener("click", function() {
  let screen = document.getElementById("calculator-screen")
  localStorage.setItem("calculator-memory", JSON.stringify(screen.value))
})

// add listener to MC
let mClearButton = document.getElementById("memory-clear-button")
mClearButton.addEventListener("click", function() {
  let screen = document.getElementById("calculator-screen")
  localStorage.setItem("calculator-memory", "")
})

// add listener to MR
let mRecallButton = document.getElementById("memory-recall-button")
mRecallButton.addEventListener("click", function() {
  let number = localStorage.getItem("calculator-memory")
  setOperand(JSON.parse(number))
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

  if (equalStatus == true) {
    firstOperand = screen.value
    secondOperand = null
    equalStatus = false
  } else {
    if (operator !== null && firstOperand !== null) {
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