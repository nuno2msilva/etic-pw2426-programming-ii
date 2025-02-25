// Solve Two Sum using nested loops (O(n²)) and then optimize it using a Map (O(n)) (PART 1).

function twoSum(numbers, target) {
  for (let a = 0; a < numbers.length; a++) {
    for (let b = a + 1; b < numbers.length; b++) {
      if (numbers[a] + numbers[b] === target) return [a, b];
    }
  }
  return [];
}

// Example:
console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]
