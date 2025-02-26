// Solve Two Sum using nested loops (O(n²)) and then optimize it using a Map (O(n)) (PART 2).

function twoSum(numbers, target) {
  const map = new Map();
  for (let a = 0; a < numbers.length; a++) {
    const complement = target - numbers[a];
    if (map.has(complement)) {
      return [map.get(complement), a];
    }
    map.set(numbers[a], a);
  }
  return [];
}

// Execution:
console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]
