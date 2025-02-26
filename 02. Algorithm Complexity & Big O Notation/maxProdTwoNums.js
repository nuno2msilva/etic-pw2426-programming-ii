// Write a function to find the maximum product of two numbers in an array. 
// Compare the complexity of a brute-force approach vs. a sorted array approach.

// Example array:
const array = [7, 0, -4, 5, 2, 3];

// Brute Force Approach (AKA O(n²) / Quadrantic Time)

const twoSumBrute = (array) => {
    let maxProduct = 0;
    for (let a = 0; a < array.length; a++) {
        for (let b = a + 1; b < array.length; b++) { // a+1 here!
            let product = array[b] * array[a];
            if (product > maxProduct) {
                maxProduct = product;
            }
        }
    }
    console.log("Result: " + maxProduct);
};

// Sorted Array Approach (AKA O(n log n) / Linearithmic Time)

const twoSumSorted = (array) => {
    let sortedArray = array.sort();
    let result = sortedArray[array.length - 1] * sortedArray[array.length - 2];
    console.log("Result: " + result)
};

// Executions:
// (Expected Result: 35)

console.time("Brute Force Runtime");
twoSumBrute(array);
console.timeEnd("Brute Force Runtime");

console.time("Sorted Array Runtime");
twoSumSorted(array);
console.timeEnd("Sorted Array Runtime");

// Comparing complexity:
//
// - Brute-force (Quadratic Time: O(n²)): Checks every possible pair of numbers in the array. 
//   Performance degrades exponentially as input size grows (e.g., 1000 elements → ~500.000 comparisons).
//
// - Sorted Array (Linearithmic Time: O(n log n)): Sorts the array first, then checks only two pairs:
//   the two largest numbers and the two smallest (negative) numbers. Sorting dominates the runtime,
//   but scales efficiently (e.g., 1000 elements → ~10.000 operations for sorting + 2 comparisons).
//
// - Sorted array method wins for large datasets due to better scalability compared to the brute force method.