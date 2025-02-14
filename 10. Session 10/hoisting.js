console.log(hoistedVar); // Output: undefined
const hoistedVar = "I'm hoisted!";

notHoistedFunc(); // Error: notHoistedFunc is not a function
var notHoistedFunc = () => console.log("I won't work");

hoistedFunc(); // Output: "I work!"
function hoistedFunc() {
  console.log("I work!");
}

/* When you run a javascript, the execution gives a glance at every line and in the case of var variables and regular functions and alocates the
space to them. While running under const or let, it will return an error because it can't access the variable before iniciating it, as for the var
inicializes along with the functions, but it cannot be defined, so it returns "undefined". */

/* When JavaScript executes a script, it first scans the entire code in a process called hoisting. During this phase, function declarations and var variables are recognized and allocated memory. Function declarations are fully hoisted, allowing them to be used before their actual definition. var declarations are also hoisted, but only their names are stored in memory with an initial value of undefined until they are assigned later during execution. In contrast, variables declared with let and const are recognized but not initialized beforehand, so accessing them before their definition results in an error. Additionally, while function declarations are hoisted, arrow functions are not because they are assigned to variables. Since let and const variables are not initialized during hoisting, trying to call an arrow function before its declaration will also result in an error. */