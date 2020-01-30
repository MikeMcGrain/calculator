// add listeners to number buttons
let numbers = document.getElementsByClassName("number-btn")
for (let number of numbers) {
  number.addEventListener("click", function() {
    displayScreen(number.innerText)
    console.log(number.innerText)
  })
}

// add listeners to operation buttons
let operations = document.getElementsByClassName("operation-btn")
for (let operation of operations) {
  operation.addEventListener("click", function() {
    switch (operation.innerText) {
      case "Clear": clearScreen()
    }
  })
}

// add listeners to clear button
document.getElementById("clear-btn")

// render number clicked to display
function displayScreen(arg) {
  let screen = document.getElementById("screen")
  screen.value = screen.value + arg
}

// clear screen
function clearScreen() {
 displayScreen(0)
}
