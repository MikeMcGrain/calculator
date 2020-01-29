// add listeners to number buttons
let numbers = document.getElementsByClassName("numbers")
for (let number of numbers) {
  number.addEventListener("click", function() {
    // displayScreen(number.innerText)
  })
}

// add listeners to operation buttons
let operations = document.getElementsByClassName("operations")
for (let operation of operations) {
  operation.addEventListener("click", function() {
    switch (operation.innerText) {
      case "Clear": clearScreen()
    }
  })
}

// render number clicked to display
function displayScreen(arg) {
  let screen = document.getElementById("screen")
  screen.value = screen.value + arg
}

// clear screen
function clearScreen() {
 displayScreen(0)
}
