// add listeners to number buttons
let numbers = document.getElementsByClassName("number-btn")
for (let number of numbers) {
  number.addEventListener("click", function() {
    displayScreen(number.innerText)
  })
}

// add listeners to operation buttons
let operations = document.getElementsByClassName("operation-btn")
for (let operation of operations) {
  operation.addEventListener("click", function() {
    console.log(operation.innerText)
    switch (operation.innerText) {
      case "/": console.log("divide"); break
      case "X": console.log("multiply"); break
      case "-": console.log("minus"); break
      case "+": console.log("plus")
    }
  })
}

// add listeners to clear button
document.getElementById("clear-btn").addEventListener("click", function() {
  document.getElementById("calc-screen").value = 0
})

// render number clicked to display
function displayScreen(arg) {
  let screen = document.getElementById("calc-screen")
  if (arg === "." && screen.value.includes(".") ) {
    return
  }
  screen.value == 0 ? (screen.value = arg) : (screen.value = screen.value + arg)
}