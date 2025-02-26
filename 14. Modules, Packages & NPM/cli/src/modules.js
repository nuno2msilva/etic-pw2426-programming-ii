/**
 * Calculates the sum of all numbers in an array.
 * @param {number[]} numbers - An array of numbers.
 * @returns {number} The sum of all numbers in the array.
 */

export function sum(numbers) {
    return numbers.reduce((total, num) => total + num, 0);
  }
  
/**
 * Calculates the average of all numbers in an array.
 * @param {number[]} numbers - An array of numbers.
 * @returns {number} The average of all numbers in the array.
 */

  export function average(numbers) {
    if (numbers.length === 0) return 0;
    return sum(numbers) / numbers.length;
  }
  

  /**
 * Calculates the median of all numbers in an array.
 * @param {number[]} numbers - An array of numbers.
 * @returns {number} The median of all numbers in the array.
 */

  export function median(numbers) {
    if (numbers.length === 0) return 0;
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  }