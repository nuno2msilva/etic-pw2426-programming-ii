/**
 * Big O Notation in JavaScript
 *
 * This file explains different Big O complexities with simple code examples,
 * their scalability, common use cases, and real-life applications.
 */

const exampleArray = Array.from({ length: 10 }, (_, a) => a + 1);

// ----------------------------------------------------------------------------------------------------

/* O(1) - Constant Time
Scalability: Excelent performance, does not grow with input size.
Use: Direct access operations like retrieving an array element.
- Real-life: Looking up a name in a contact list by index; getting a specific book from a bookshelf;
Checking the first message in a chat; Accessing the first item in an inventory;
Retrieving a stored password from a list.
*/

function constantTime(arr) {
    return arr[0]; // Always takes the same time regardless of array size
}

// ----------------------------------------------------------------------------------------------------

/* O(log n) - Logarithmic Time
Scalability: Very good performance, scales well for large inputs.
Use: Binary search algorithms.
Real-life: Finding a word in a dictionary (divide and conquer approach); Looking up a phone number in a sorted directory; 
Navigating through a decision tree; Searching a name in an alphabetized list;
Debugging with a binary search method.
*/

function logarithmicTime(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// ----------------------------------------------------------------------------------------------------

/* O(n) - Linear Time
Scalability: Good perfomance, but slower as input grows.
Use: Searching through an unsorted list.
Real-life: Scanning a grocery list to find an item; Checking attendance in a class;
Looking for a file in an unsorted folder; Searching for a lost key in a drawer;
Finding a contact in an unsorted phone book.
*/

function linearTime(arr, target) {
    for (let a = 0; a < arr.length; a++) {
        if (arr[a] === target) return a;
    }
    return -1;
}

// ----------------------------------------------------------------------------------------------------

/* O(n log n) - Linearithmic Time
Scalability: Moderate efficienciMore efficient than O(n^2), commonly seen in sorting.
Use: Merge sort, QuickSort.
Real-life: Sorting a deck of cards efficiently; Organizing emails by date;
Merging two sorted lists; Sorting search results by relevance;
Combining and sorting multiple databases.
*/

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right);
}
function merge(left, right) {
    let result = [], a = 0, b = 0;
    while (a < left.length && b < right.length) {
        if (left[a] < right[b]) result.push(left[a++]);
        else result.push(right[b++]);
    }
    return [...result, ...left.slice(a), ...right.slice(b)];
}

// ----------------------------------------------------------------------------------------------------

/* O(n^2) - Quadratic Time
Scalability: Poor for large inputs, but used for small datasets.
Use: Bubble Sort, nested loops.
Real-life: Comparing each student in a class to every other student; Checking all possible pairs of friends in a group;
Validating mutual followers on social media; Finding duplicate items in an unsorted list;
Simulating every possible move in a game.
*/

function quadraticTime(arr) {
    for (let a = 0; a < arr.length; a++) {
        for (let b = 0; b < arr.length; b++) {
            console.log(arr[a], arr[b]);
        }
    }
}

// ----------------------------------------------------------------------------------------------------

/* O(2^n) - Exponential Time
Scalability: Grows extremely fast, infeasible for large inputs.
Use: Recursive problems like the Fibonacci sequence.
Real-life: Computing all possible combinations of a password; Solving complex recursive puzzles;
Calculating all subsets of a set; Brute-force cracking an encryption key;
Generating all possible outcomes of a tournament.
*/

function exponentialTime(n) {
    if (n <= 1) return n;
    return exponentialTime(n - 1) + exponentialTime(n - 2);
}

// ----------------------------------------------------------------------------------------------------

/* O(n!) - Factorial Time
Scalability: Horrible for large inputs, used in brute-force solutions.
Use: Solving the Traveling Salesman Problem.
Real-life: Finding all ways to arrange a group of people in a line; Generating all possible anagrams of a word;
Evaluating all ways to seat guests at a wedding; Computing every permutation of a deck of cards;
Testing all possible routes in a delivery system.
*/

function factorialTime(n) {
    if (n === 0) return 1;
    return n * factorialTime(n - 1);
}

// ----------------------------------------------------------------------------------------------------

// Execution with console.time

console.time("O(1) Constant Time");
console.log(constantTime(exampleArray));
console.timeEnd("O(1) Constant Time");

console.time("O(log n) Logarithmic Time");
console.log(logarithmicTime(exampleArray, 5));
console.timeEnd("O(log n) Logarithmic Time");

console.time("O(n) Linear Time");
console.log(linearTime(exampleArray, 5));
console.timeEnd("O(n) Linear Time");

console.time("O(n log n) Merge Sort");
console.log(mergeSort(exampleArray));
console.timeEnd("O(n log n) Merge Sort");

console.time("O(n^2) Quadratic Time");
quadraticTime(exampleArray);
console.timeEnd("O(n^2) Quadratic Time");

console.time("O(2^n) Exponential Time");
console.log(exponentialTime(10));
console.timeEnd("O(2^n) Exponential Time");

console.time("O(n!) Factorial Time");
console.log(factorialTime(5));
console.timeEnd("O(n!) Factorial Time");

console.log("Big O Examples Executed");
