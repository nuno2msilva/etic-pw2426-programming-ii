// Explain why O(2n + 5) simplifies to O(n).

function countSteps(n) {
  let steps = 0; // Track the total number of steps

  // Part 1: Count each item twice (2*n steps)
  for (let a = 0; a < n; a++) {
    steps += 1; // Count the first time
    steps += 1; // Count the second time
  }

  // Part 2: Count 5 extra steps (constant time)
  for (let b = 0; b < 5; b++) {
    steps += 1; // Count one step
  }

  return steps; // Return the total steps
}

// Execution Examples:
console.log(countSteps(10)); // Expected: (10 * 2) + 5 = 25
console.log(countSteps(100)); // Expected: (100 * 2) + 5 = 205
console.log(countSteps(1000)); // Expected: (1000 * 2) + 5 = 2005

// The '2' in '2n' is just a multiplier (by 2x) and doesn’t change the linear growth.
// The '+5' is a constant and becomes insignificant as 'n' grows larger.
