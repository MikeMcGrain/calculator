// add listeners to number buttons
numbers = document.getElementsByClassName("numbers")
for (let number of numbers) {
  number.addEventListener("click", function() {
    displayScreen(number.innerText)
  })
}

// add listeners to operation buttons
operations = document.getElementsByClassName("operations")
for (let operation of operations) {
  operation.addEventListener("click", function() {
    console.log(operation.innerText)
  })
}

// render number clicked to display
function displayScreen(arg) {
  console.log(arg)
  let screen = document.getElementById("screen")
  screen.value = arg
}
