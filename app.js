let firstOperand = null
let secondOperand = null
let operator = null

// adds click listeners to number buttons
let numberButtons = document.getElementsByClassName("number-btn")
for (let numberButton of numberButtons) {
  numberButton.addEventListener("click", function() {
    if (operator !== null) {
      if (secondOperand === null) {
        secondOperand = numberButton.innerText
      } else {
        secondOperand += numberButton.innerText
      }
      displayScreen(secondOperand)
    } else {
      if (firstOperand === null) {
        firstOperand = numberButton.innerText
      } else {
        firstOperand += numberButton.innerText
      }
      displayScreen(firstOperand)
    }
  })
}

// adds click listeners to operator buttons
let operatorButtons = document.getElementsByClassName("operator-btn")
for (let operatorButton of operatorButtons) {
  operatorButton.addEventListener("click", function() {
    if (operator == null) {
      firstOperand = parseFloat(document.getElementById("calc-screen").value)
      operator = operatorButton.getAttribute("data-operator")
    }
  })
}

// adds click  listener to decimal button
let decimalButton = document.getElementById("decimal")
decimalButton.addEventListener("click", function() {
  let screen = document.getElementById("calc-screen")
  if (screen.value.includes(".") == true) {
    return
  } else {
    if (operator === null) {
      firstOperand += "."
      displayScreen(firstOperand)
    }
    if (operator !== null) {
      secondOperand += "."
      displayScreen(secondOperand)
    }
  }
})

// adds click listener to equal button
let equalButton = document.getElementById("equal-btn")
equalButton.addEventListener("click", function() {

  firstOperand = parseFloat(firstOperand)
  secondOperand = parseFloat(secondOperand)
  switch (operator) {
    case "divide":
      displayScreen(firstOperand / secondOperand)
      break
    case "times":
      displayScreen(firstOperand * secondOperand)
      break
    case "minus":
      displayScreen(firstOperand - secondOperand)
      break
    case "plus":
      displayScreen(firstOperand + secondOperand)
      break
  }
})

// adds click listener to clear button
document.getElementById("clear-btn").addEventListener("click", function() {
  document.getElementById("calc-screen").value = 0
  firstOperand = null
  secondOperand = null
  operator = null
})

// render number clicked to display
function displayScreen(char) {
  let screen = document.getElementById("calc-screen")
  screen.value = char
}