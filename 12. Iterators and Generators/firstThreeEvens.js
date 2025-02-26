const userInput = 16;

function* evenNumbers(start) {
  if (start % 2 !== 0) {
    throw new Error("Start number must be an even number. Edit /Line 1/ accordingly!");
  }

  let count = 0;
  let currentNumber = start;

  while (count < 3) {
    yield currentNumber;
    currentNumber += 2;
    count++;
  }
}



// Using the evenNumbers generator
const evenGenerator = evenNumbers(userInput);
console.log("Your 1st even number is " + evenGenerator.next().value + "!");
console.log("Your 2nd even number is " + evenGenerator.next().value + "!");
console.log("Your 3rd even number is " + evenGenerator.next().value + "!");
console.log("Even numbers delivered, as requested!");

