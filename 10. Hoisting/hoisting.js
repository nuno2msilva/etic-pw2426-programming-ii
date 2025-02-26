console.log(hoistedVar); // Output: undefined
const hoistedVar = "I'm hoisted!";

notHoistedFunc(); // Error: notHoistedFunc is not a function
var notHoistedFunc = () => console.log("I won't work");

hoistedFunc(); // Output: "I work!"
function hoistedFunc() {
  console.log("I work!");
}

// When executing a JavaScript file, the engine first scans the code and allocates memory for 'var' variables and functions.
// This process is called hoisting.
// 'var' variables are partially hoisted, meaning their names are allocated in memory but are initialized with 'undefined' until assigned a value later in the execution phase.
// Functions, on the other hand, are fully hoisted, allowing them to be called even before their actual definition in the code.
// Variables declared with 'let' and 'const' are also recognized during the scan phase but are not initialized. 
// They remain in a "temporal dead zone" (TDZ) until their declaration is encountered in the code, so accessing them before their declaration results in an error.
// Arrow functions behave differently from regular function declarations because they are typically assigned to variables (e.g., 'let', 'const', or 'var'). 
// As a result, they are not hoisted in the same way as function declarations. 
// If the variable is declared with 'let' or 'const', the arrow function will be in the TDZ until its declaration.