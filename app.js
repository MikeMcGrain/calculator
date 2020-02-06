const DECIMAL_LIMIT = 5

let firstOperand = null
let secondOperand = null
let operator = null
let equalIsPressed = false

// add listeners to number buttons
let numberButtons = document.getElementsByClassName("number-button")
for (let numberButton of numberButtons) {
  numberButton.addEventListener("click", function() {setOperand(numberButton.innerText)})
}

// add listeners to operator buttons
let operatorButtons = document.getElementsByClassName("operator-button")
for (let operatorButton of operatorButtons) {
  operatorButton.addEventListener("click", function() {setOperator(operatorButton)
  })
}

document.getElementById("decimal-button").addEventListener("click", appendDecimal)

document.getElementById("equal-button").addEventListener("click", function() {
  equalIsPressed = true
  const NUMBER = solveEquation(firstOperand, secondOperand)
  displayOnScreen(NUMBER)
})

document.getElementById("clear-button").addEventListener("click", clearScreen)

document.getElementById("memory-store-button").addEventListener("click", function() {
  const SCREEN = document.getElementById("calculator-screen")
  localStorage.setItem("calculator-memory", JSON.stringify(SCREEN.value))
})

document.getElementById("memory-recall-button").addEventListener("click", function() {
  const NUMBER = localStorage.getItem("calculator-memory")
  if (NUMBER !== null && NUMBER !== "" && equalIsPressed !== true) {
    setOperand(JSON.parse(NUMBER))
  } else {
    return
  }
})

document.getElementById("memory-clear-button").addEventListener("click", function() {
  localStorage.setItem("calculator-memory", "")
})

function setOperand(number) {
  if (operator == null) {
    firstOperand === null ? (firstOperand = number) : (firstOperand += number)
    displayOnScreen(firstOperand)
  } else {
    secondOperand === null ? (secondOperand = number) : (secondOperand += number)
    displayOnScreen(secondOperand)
  }
}

function setOperator(operatorButton) {
  const SCREEN = document.getElementById("calculator-screen")

  if (equalIsPressed == true) {
    firstOperand = SCREEN.value
    secondOperand = null
    equalIsPressed = false
  } else {
    if (operator && firstOperand && secondOperand !== null) {
      firstOperand = solveEquation(firstOperand, SCREEN.value)
      secondOperand = null
      displayOnScreen(firstOperand)
    }
  }
  operator = operatorButton.getAttribute("data-operator")
}

function appendDecimal() {
  const SCREEN = document.getElementById("calculator-screen")
  if (SCREEN.value.includes(".")) {
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