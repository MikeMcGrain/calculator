// add listeners to number buttons
numbers = document.getElementsByClassName("numbers")
for (let number of numbers) {
    number.addEventListener("click", function() {
      console.log(number.innerText)
    })
}

// add listeners to operation buttons 
operations = document.getElementsByClassName("operations")
for (let operation of operations) {
    operation.addEventListener("click", function() {
      console.log(operation.innerText)
    })
}