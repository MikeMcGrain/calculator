let firstOperand = null
let secondOperand = null
let operator = null

// add listeners to number buttons
let numberButtons = document.getElementsByClassName("number-btn")
for (let numberButton of numberButtons) {
  numberButton.addEventListener("click", function() {
    if (operator !== null) {
      document.getElementById("calc-screen").value = 0
      secondOperand = parseFloat(numberButton.innerText)
      displayScreen(numberButton.innerText)
    } else {
      displayScreen(numberButton.innerText)

    }

  })
}

// add listeners to operator buttons
let operatorButtons = document.getElementsByClassName("operator-btn")
for (let operatorButton of operatorButtons) {
  operatorButton.addEventListener("click", function() {
    let screen = document.getElementById("calc-screen")
    if (operator == null) {
      firstOperand = parseFloat(screen.value)
      console.log(firstOperand)
      operator = operatorButton.getAttribute("data-operator")
      console.log(operator)
    }

    // let screen = document.getElementById("calc-screen")
    // if (screen.value.slice(-1) === " " ) {return}
    // else {displayScreen(` ${operatorButton.innerText} `)}


    // }
  })
}

// add listener to equal button
let equalButton = document.getElementById("equal-btn")
equalButton.addEventListener("click", function() {
  //evaluate expression
  document.getElementById("calc-screen").value = 0
  switch (operator) {
    case "divide": displayScreen(firstOperand / secondOperand) ; break
    case "times": displayScreen(firstOperand * secondOperand); break
    case "minus": displayScreen(firstOperand - secondOperand); break
    case "plus": displayScreen(firstOperand + secondOperand); break
  }
})

// add listeners to clear button
document.getElementById("clear-btn").addEventListener("click", function() {
  document.getElementById("calc-screen").value = 0
  firstOperand = null
  secondOperand = null
  operator = null
})

// render number clicked to display
function displayScreen(char) {
  let screen = document.getElementById("calc-screen")
  if (char === "." && screen.value.includes(".")) {
    return
  }
  screen.value == 0
    ? (screen.value = char)
    : (screen.value = screen.value + char)
}
