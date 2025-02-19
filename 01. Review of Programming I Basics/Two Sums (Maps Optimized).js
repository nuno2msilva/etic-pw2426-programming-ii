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
  
  // Example:
  console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]