import { sum, average, median } from "../src/modules.js"; // Import math functions from the modules file
import readline from "readline"; // Import readline for user input

const rl = readline.createInterface({ // Create a readline interface for input/output
  input: process.stdin, // Use a standard input
  output: process.stdout, // Use a standard output
});

rl.question("Type the desired operation (sum, average, median): ", (operator) => { // Ask the user for the operation
  if (!["sum", "average", "median"].includes(operator)) { // Check if the operation is valid
    console.log("Invalid operation. Use: sum, average, median"); // Print error message if invalid
    rl.close(); // Close the readline interface
    return; // Exit the function
  }

  rl.question("Type your numbers below (separated by spaces): ", (numbersInput) => { // Ask the user for numbers
    const numbers = numbersInput.split(" ").map(Number); // Split input into an array and convert to numbers

    if (numbers.some(isNaN)) { // Check if any input is not a number
      console.log("All inputs must be numbers!"); // Print error message if invalid
      rl.close(); // Close the readline interface
      return; // Exit the function
    }

    let result; // Variable to store the result
    switch (operator) { // Perform the selected operation
      case "sum":
        result = sum(numbers); // Calculate the sum
        break;
      case "average":
        result = average(numbers); // Calculate the average
        break;
      case "median":
        result = median(numbers); // Calculate the median
        break;
    }

    console.log(`Result: ${result}`); // Print the result
    rl.close(); // Close the readline interface
  });
});