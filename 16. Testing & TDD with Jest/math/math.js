export function sum(a, b) {
  return a + b;
}

export function subtract(a, b) {
  if (typeof a != "number" || typeof b != "number")
    throw new Error ("not possible");
  return a - b;
}

console.log(subtract(10,2));
