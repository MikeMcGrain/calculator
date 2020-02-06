const DECIMAL_LIMIT = 5

let firstOperand = null
let secondOperand = null
let operator = null
let equalIsPressed = false

// add listeners to number buttons
let numberButtons = document.getElementsByClassName("number-button")
for (let numberButton of numberButtons) {
  numberButton.addEventListener("click", function() {
    setOperand(numberButton.innerText)
  })
}

// add listeners to operator buttons
let operatorButtons = document.getElementsByClassName("operator-button")
for (let operatorButton of operatorButtons) {
  operatorButton.addEventListener("click", function() {
    setOperator(operatorButton)
  })
}

document.getElementById("decimal-button").addEventListener("click", appendDecimal)

document.getElementById("equal-button").addEventListener("click", function() {
  equalIsPressed = true
  let number = solveEquation(firstOperand, secondOperand)
  displayOnScreen(number)
})

document.getElementById("clear-button").addEventListener("click", clearScreen)

document.getElementById("memory-store-button").addEventListener("click", function() {
  let screen = document.getElementById("calculator-screen")
  localStorage.setItem("calculator-memory", JSON.stringify(screen.value))
})

document.getElementById("memory-recall-button").addEventListener("click", function() {
  let number = localStorage.getItem("calculator-memory")
  if (number !== null && number !== "" && equalIsPressed !== true) {
    setOperand(JSON.parse(number))
  } else {
    return
  }
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
    if (operator !== null && firstOperand !== null && secondOperand !== null) {
      firstOperand = solveEquation(firstOperand, screen.value)
      secondOperand = null
      displayOnScreen(firstOperand)
    }
  }
  operator = operatorButton.getAttribute("data-operator")
}

function appendDecimal() {
  let screen = document.getElementById("calculator-screen")
  if (screen.value.includes(".")) {
    return
  } else {
    operator == null
      ? ((firstOperand += "."), displayOnScreen(firstOperand))
      : ((secondOperand += "."), displayOnScreen(secondOperand))
  }
}

function solveEquation(numA, numB) {
  numA = parseFloat(numA)
  numB = parseFloat(numB)
  let solution

  switch (operator) {
    case "divide": solution = numA / numB; break
    case "times": solution = numA * numB; break
    case "minus": solution = numA - numB; break
    case "plus": solution = numA + numB
  }
  return solution.toString()
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