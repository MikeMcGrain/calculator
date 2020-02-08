const DECIMAL_LIMIT = 5

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
  operatorButton.addEventListener("click", function() {setOperator(operatorButton)
  })
}

document.getElementById("decimal-button").addEventListener("click", function(){
  const scree = document.getElementById("calculator-screen")
  if (screen.value.includes(".")) {return}

  operator == null ? displayOnScreen(firstOperand += ".") : displayOnScreen(secondOperand += ".")
})

document.getElementById("equal-button").addEventListener("click", function() {
  const number = solveEquation(firstOperand, secondOperand).toString()
  firstOperand = number
  secondOperand = null
  operator = null
  displayOnScreen(number)
})

document.getElementById("clear-button").addEventListener("click", function(){
  document.getElementById("calculator-screen").value = 0
  firstOperand = null
  secondOperand = null
  operator = null
})

document.getElementById("memory-store-button").addEventListener("click", function() {
  const screen = document.getElementById("calculator-screen")
  localStorage.setItem("calculator-memory", JSON.stringify(screen.value))
})

document.getElementById("memory-recall-button").addEventListener("click", function() {
  const number = localStorage.getItem("calculator-memory")
  if (number !== null && number !== "") {setOperand(JSON.parse(number))} 
  else {return}
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
  const screen  = document.getElementById("calculator-screen")
  if (operator && firstOperand && secondOperand !== null) {
    firstOperand = solveEquation(firstOperand, screen.value).toString()
    secondOperand = null
    displayOnScreen(firstOperand)
  }
  operator = operatorButton.getAttribute("data-operator")
}

function solveEquation(numA, numB) {
  numA = parseFloat(numA)
  numB = parseFloat(numB)

  switch (operator) {
    case "divide": return numA / numB
    case "times": return numA * numB
    case "minus": return numA - numB
    case "plus": return numA + numB
  }
}

function displayOnScreen(number) {
  if (number.includes(".") && number.split(".")[1].length > DECIMAL_LIMIT) {
    number = parseFloat(number).toFixed(5)
  }
  document.getElementById("calculator-screen").value = number
}