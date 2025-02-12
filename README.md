# Programming II

JavaScript | [Mozilla JavaScript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## **Session 1: Review of Programming I Basics**  
**Content**:
- JavaScript syntax refresher: `let` vs `const`, arrow functions, template literals.
- Data structures: Arrays, objects, `Map`, `Set`.
- Control flow: `for`, `while`, `switch`, ternary operators.
- Problem-solving techniques: Writing pseudoscript, creating flowcharts.

**Objective**:
- Strengthen foundational JavaScript skills.
- Translate real-world problems into structured logic.

**Exercises**:
1. Write a function `findDuplicates(arr)` that returns an array of duplicate elements.
2. Create a flowchart for a thermostat system that adjusts temperature based on user input.
3. Solve [Two Sum](https://leetcode.com/problems/two-sum/) using nested loops (O(n²)) and then optimize it using a `Map` (O(n)).
4. Implement a `Student` class with properties (name, grades) and methods to calculate final grade.

**Resources**:
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) 
- [Pseudoscript](https://github.com/jorgealves/pseudoscript)

---

## **Session 2: Algorithm Complexity & Big O Notation**
**Content**:
- Time vs. space complexity: Definitions and trade-offs.
- Big O rules: Drop constants, dominant terms, worst-case analysis.
- Analyzing loops: Single loops, nested loops, sequential operations.
- Common complexities: O(1), O(n), O(n²), O(log n).

**Objective**:
- Quantify algorithm efficiency using Big O.
- Compare solutions based on scalability.

**Exercises**:  
1. Calculate the time complexity of this code:
```javascript
const n = 1_000_000;
for (let i = 0; i < n; i++) {
  for (let j = i; j < n; j++) {
   console.log(i + j);
  }
}
```
2. Write a function to find the maximum product of two numbers in an array. Compare the complexity of a brute-force approach vs. a sorted array approach.
3. Solve [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) with O(n) time and O(n) space.
4. Explain why O(2n + 5) simplifies to O(n).

**Resources:**
[Big O Cheat Sheet](https://www.bigocheatsheet.com/)

## Session 3: Recursion & Complexity Analysis

**Content:**

- Recursion basics: Base case, recursive case, call stack.
- Recursion vs. iteration: When to use each.
- Tail recursion and stack overflow prevention.
- Recurrence relations for complexity (e.g., Fibonacci: T(n) = T(n-1) + T(n-2) + O(1)).

**Objective:**
- Solve problems recursively and analyze recursive complexity.

**Exercises:**

- Write a recursive `power(x, n)` function (calculate x^n).
- Solve [Fibonacci Number](https://leetcode.com/problems/fibonacci-number/) using recursion, then memoization.
- Print all permutations of a string using backtracking.
- Explain why the recursive Fibonacci has O(2^n) time complexity.

**Resources:**

- [MDN Recursion Guide](https://developer.mozilla.org/en-US/docs/Glossary/Recursion)

## Session 4: Arrays, Strings & File I/O

**Goal**: Learn to manipulate files and structured data using Node.js.

**Definitions**
- File I/O: Reading/writing files using Node.js’s fs module.
- CSV/JSON Parsing: Converting structured text (e.g., CSV rows) into JavaScript objects.
- Array/String Methods: Tools like split(), map(), and filter() to transform data.

**MDN Reference:**

- [Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [String Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Node.js fs Module](https://nodejs.org/api/fs.html)

### Tutorial

#### Step 1: Read a File

- Use `fs.readFileSync()` to read a CSV file:

```javascript
const fs = require('fs');
const csvData = fs.readFileSync('Session4_data.csv', 'utf-8');
``` 

#### Step 2: Parse CSV Data

- Split rows by newlines `(\n)` and columns by commas:

```javascript
const rows = csvData.split('\n');
const headers = rows[0].split(','); // ["name", "email", "age"]
const data = rows.slice(1).map(row => {
  const values = row.split(',');
  return {
    name: values[0],
    email: values[1],
    age: parseInt(values[2])
  };
});
```

#### Step 3: Write to JSON

- Convert the array to JSON and save it:

```javascript
fs.writeFileSync('session4_data.json', JSON.stringify(data, null, 2));  
```

#### Step 4: Handle Errors

- Wrap code in a try/catch block:

```javascript
try {
  // ... file operations ...
} catch (error) {
  console.error('Error:', error.message);
}
```

### Exercise: CSV to JSON Converter

- Build a script that converts a CSV file to a JSON file.
Requirements

- Read input.csv with columns: name,email,age.

- Skip invalid rows (e.g., missing fields, non-numeric age).

- Save the cleaned data as output.json.

**Sample Input (input.csv):**

```csv
name,email,age  
Alice,alice@example.com,30  
Bob,bob@example.com,25  
Charlie,charlie@example.com,invalid  
```

**Expected Output (output.json):**

```json
[  
  { "name": "Alice", "email": "alice@example.com", "age": 30 },  
  { "name": "Bob", "email": "bob@example.com", "age": 25 }  
]  
```

**Hints**

- Use `Array.filter()` to remove invalid rows.
- Validate age with `isNaN()`.
- Use fs.existsSync() to check if the input file exists.

#### Challenge (Optional)

- Modify the script to accept input/output filenames as command-line arguments.

- Add a --verbose flag to log skipped rows and reasons.

## Session 5: Advanced Objects, Maps & Data Structures

**Goal:** Master complex data structures and solve problems involving nested data.

### Definitions

- Map: A collection of key-value pairs (unlike objects, keys can be any type).

- Deep Comparison: Checking if two objects have identical nested properties.

**MDN Reference:**

- [Map Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Object Comparison](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

### Tutorial

#### Step 1: Using Map

```javascript
const userMap = new Map();  
userMap.set('alice', { age: 30 });  
console.log(userMap.get('alice')); // { age: 30 }  
```

#### Step 2: Deep Object Comparison

- Recursively compare objects:

```javascript
function deepEqual(obj1, obj2) {  
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {  
    return obj1 === obj2;  
  }  
  const keys1 = Object.keys(obj1);  
  const keys2 = Object.keys(obj2);  
  if (keys1.length !== keys2.length) return false;  
  return keys1.every(key => deepEqual(obj1[key], obj2[key]));  
}  
```

### Exercise: Group Users by City

- Given an array of users, group them by their city using a Map.

**Sample Input:**

```javascript

const users = [  
  { id: 1, name: 'Alice', city: 'Paris' },  
  { id: 2, name: 'Bob', city: 'London' },  
  { id: 3, name: 'Charlie', city: 'Paris' }  
];
```  

**Expected Output:**

```javascript
Map {  
  'Paris' => [  
    { id: 1, name: 'Alice', city: 'Paris' },  
    { id: 3, name: 'Charlie', city: 'Paris' }  
  ],  
  'London' => [ { id: 2, name: 'Bob', city: 'London' } ]  
}  
```

**Hints**
- Initialize a Map.
- Iterate through users and add them to the appropriate city array.

## Session 6: Recursion & Algorithm Optimization

**Goal:** Solve problems recursively and optimize solutions using memoization.

### Definitions

- Memoization: Caching results of expensive function calls to avoid redundant work.

- Tail-Call Optimization: A technique to optimize recursive calls to prevent stack overflow (limited support in JS).

**MDN Reference:**

[Functions and Recursion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Recursion)
[Closures (for memoization)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

### Tutorial

#### Step 1: Basic Recursion

- Calculate the factorial of a number:

```javascript
function factorial(n) {  
  if (n === 0) return 1; // Base case  
  return n * factorial(n - 1);  
}  
console.log(factorial(5)); // 120  
```

#### Step 2: Memoization

- Cache results for Fibonacci:

```javascript
const memo = new Map();  
function fib(n) {  
  if (n <= 1) return n;  
  if (memo.has(n)) return memo.get(n);  
  const result = fib(n - 1) + fib(n - 2);  
  memo.set(n, result);  
  return result;  
}  
console.log(fib(10)); // 55 (avoids redundant calculations)  
```

#### Step 3: Recursive Directory Traversal

- Traverse a nested object structure (simulating directories):

```javascript
function traverse(obj, path = []) {  
  if (typeof obj !== 'object') {  
    console.log(path.join('/'), '->', obj);  
    return;  
  }  
  for (const key in obj) {  
    traverse(obj[key], [...path, key]);  
  }  
}  

const directories = {  
  src: { utils: { 'math.js': 'content' }, app: 'index.js' },  
  public: 'assets'  
};  
traverse(directories);  
```

### Exercise: Memoized Fibonacci & Directory Flattening
#### Problem 1: Optimize Fibonacci

- Refactor the Fibonacci function to use memoization without a global Map.

  - Requirements:
    - Use a closure to encapsulate the cache.
    - Handle n ≤ 0 gracefully.

**Sample Input:**
```javascript
console.log(fibMemo(10)); // 55  
console.log(fibMemo(50)); // 12586269025 (efficient!)  
```

#### Problem 2: Flatten Nested Object

- Write a recursive function to flatten a deeply nested object into key-value pairs.

**Sample Input:**

```javascript
const nested = {  
  a: 1,  
  b: { c: 2, d: { e: 3 } },  
  f: [4, 5]  
};  
```

**Expected Output:**
```javascript
{  
  'a': 1,  
  'b.c': 2,  
  'b.d.e': 3,  
  'f.0': 4,  
  'f.1': 5  
}  
```

**Hints**

- For Fibonacci, initialize the cache inside the closure.
- For flattening, pass the current path as an argument in recursion.

#### Challenge (Optional)

- Implement a recursive deepClone function to copy nested objects/arrays.
- Solve the Tower of Hanoi problem recursively.

## Session 7: Asynchronous JS & External APIs

**Goal:** Fetch and process data from REST APIs using async/await.

### Definitions

- Promise: An object representing eventual completion/failure of an async operation.
- async/await: Syntactic sugar for writing asynchronous code in a synchronous style.

**MDN Reference:**

- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

### Tutorial

#### Step 1: Fetch Data with node-fetch
```bash
npm install node-fetch  
```
```javascript
import fetch from 'node-fetch';  

async function fetchUser(id) {  
  try {  
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);  
    if (!response.ok) throw new Error('Failed to fetch');  
    return await response.json();  
  } catch (error) {  
    console.error(error.message);  
  }  
}  
```

#### Step 2: Parallel Requests

- Use Promise.all to fetch multiple users:
```javascript
async function fetchUsers() {  
  const ids = [1, 2, 3];  
  const promises = ids.map(id => fetchUser(id));  
  const users = await Promise.all(promises);  
  console.log(users);  
}  
```

### Exercise: Weather Data Aggregator

- Fetch weather data from OpenWeatherMap API for 3 cities and save the results to a JSON file.

**Requirements:**

- Use node-fetch and async/await.
- Handle API errors (e.g., invalid API key, city not found).
- Save output to weather.json with structure:
  ```json
  [  
    { "city": "London", "temp": 15, "humidity": 80 },  
    ...  
  ]  
  ```
**Sample Code**
```javascript
const API_KEY = 'your_api_key'; // Replace with a valid key  
const CITIES = ['London', 'Paris', 'Tokyo'];  
```

**Hints**

- API endpoint: https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}.
- Extract temp and humidity from the response.



## Session 8: Problem-Solving Patterns (Advanced)

**Goal:** Solve complex problems using dynamic programming and greedy algorithms.

### Definitions

- Dynamic Programming (DP): Breaking problems into overlapping subproblems and storing their solutions.
- Greedy Algorithm: Making locally optimal choices at each step to find a global optimum.
- Backtracking: Systematically exploring all potential solutions and abandoning invalid paths early.

**Reference:**

- [Greedy Algorithm](https://fanzhongzeng78.medium.com/greedy-algorithm-in-javascript-88f2d71edf5d)
- [Bag it Up - Greedy Algorithms in Javascript](https://dev.to/albertywu/bag-it-up--greedy-algorithms-in-javascript-3gac)
- [Backtracking Algorithms](https://dev.to/jcorley44/backtracking-algorithms-40p6)
- [Backtracking Algorithm](https://medium.com/geekculture/backtracking-algorithm-95622dcb6ac8)
- [JS Best Practices](https://dev.to/codewithshahmeer/best-practices-for-writing-efficient-javascript-code-160p)

### Tutorial
#### Step 1: Dynamic Programming (Fibonacci with Memoization)
```javascript
function createFib() {  
  const memo = new Map();  
  return function fib(n) {  
    if (n <= 1) return n;  
    if (memo.has(n)) return memo.get(n);  
    const result = fib(n - 1) + fib(n - 2);  
    memo.set(n, result);  
    return result;  
  };  
}  
const fibMemo = createFib();  
console.log(fibMemo(50)); // 12586269025 (efficient!)  
```

#### Step 2: Greedy Algorithm (Coin Change)

- Find the minimum coins needed for a target amount (assuming infinite supply):
```javascript
function coinChange(coins, target) {  
  coins.sort((a, b) => b - a); // Sort descending  
  let count = 0;  
  for (const coin of coins) {  
    while (target >= coin) {  
      target -= coin;  
      count++;  
    }  
  }  
  return target === 0 ? count : -1;  
}  
console.log(coinChange([1, 5, 10], 28)); // 10 + 10 + 5 + 1 + 1 + 1 → 6 coins  
```

### Exercise: 0/1 Knapsack Problem
- Given items with weights and values, maximize the value in a knapsack of capacity W.

**Sample Input:**
```javascript
const items = [  
  { weight: 2, value: 10 },  
  { weight: 3, value: 15 },  
  { weight: 5, value: 40 }  
];  
const capacity = 7;  
```

**Expected Output:** 50 (Items 0 and 2 -> 10 + 40 = 50 with total weight 7.

**Requirements:**

- Use memoization or a DP table.
- Handle up to 1000 items (optimize for time).

**Hints:**

- Define a recursive function knapsack(index, remainingCapacity).
- Memoize results based on index and remainingCapacity.

### Challenge (Optional)

- Solve the "Unbounded Knapsack" (items can be reused).
- Implement the "Longest Common Subsequence" problem with DP.

## Session 9: Error Handling & Debugging in Node

**Goal:** Write resilient code and debug Node.js applications effectively.

### Definitions

- Stack Trace: A report of active stack frames at a specific execution point.
- Custom Errors: User-defined error types extending Error.
- Logging: Recording application events for auditing and debugging (e.g., winston).

**MDN Reference:**

- [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Error Object](https://dev.to/codewithshahmeer/best-practices-for-writing-efficient-javascript-code-160p)
- [try/catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

### Tutorial
#### Step 1: Custom Error Class
```javascript
class ValidationError extends Error {  
  constructor(message) {  
    super(message);  
    this.name = 'ValidationError';  
  }  
}  

function validateUser(user) {  
  if (!user.email) throw new ValidationError('Email is required');  
}
```

#### Step 2: Logging with Winston
```bash
npm install winston  
```
```javascript
const winston = require("winston")

const logger = winston.createLogger({  
  level: 'debug',  
  transports: [new winston.transports.Console()],  
});  

logger.info('Server started');  
logger.error('Failed to connect to DB');  
```

### Exercise: Debugging a File Processor
- Debug and fix the following buggy code. It should read a file, count words, and log the result.

**Buggy Code:**
```javascript
const fs = require('fs');  

function countWords(filename) {  
  const data = fs.readFileSync(filename);  
  const words = data.split(' ');  
  return words.length;  
}  

console.log(countWords('poem.txt'));  
```

**Errors to Fix:**

- Missing encoding in readFileSync (returns a buffer).
- No error handling for missing files.
- Incorrect word splitting (punctuation not removed).

**Sample Input (poem.txt):**

```txt
Roses are red, violets are blue.  
```
**Expected Output:** 6 (after removing punctuation).

**Hints:**

- Use utf-8 encoding.
- Remove punctuation with replace(/[^\w\s]/g, '').

### Challenge (Optional)
- Add a logger to track file processing time.
- Write a test with Jest to verify error handling.

## Session 10: Hoisting

Goal: Understand how JavaScript hoists variable and function declarations.

### 1. Definition:

Hoisting is JavaScript's default behavior of moving declarations (variables and functions) to the top of their scope during compilation.

- Variables declared with `var` are hoisted but initialized to `undefined`.
- `let/const` are hoisted but not initialized (Temporal Dead Zone).
- Function declarations are fully hoisted (name and body).

** References:**

- [MDN: Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)

### 2. Tutorial:

- Create a file hoisting.js:

```javascript
console.log(hoistedVar); // Output: undefined
var hoistedVar = "I'm hoisted!";

notHoistedFunc(); // Error: notHoistedFunc is not a function
var notHoistedFunc = () => console.log("I won't work");

hoistedFunc(); // Output: "I work!"
function hoistedFunc() {
  console.log("I work!");
}
```

### 3. Exercise:

Predict and explain in a text file the outputs/errors of the code above.

**Challenge: (Optional)**
Rewrite the code using let/const and explain the differences.

## Session 11: Classes and Inheritance

Goal: Learn to create classes and implement inheritance.

### 1. Definition:

- Class: A blueprint for creating objects with shared methods/properties.
- Inheritance: Subclasses inherit properties/methods from a parent class using extends.
- Use super() to call the parent constructor.

**References:**

- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

### 2. Tutorial:

- Create classes.js:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // Call parent constructor
  }

  speak() {
    return `${super.speak()} ${this.name} barks!`;
  }
}

const dog = new Dog("Rex");
console.log(dog.speak()); // "Rex makes a noise. Rex barks!"
```

### 3. Exercise:
Create a Cat class that overrides speak() to return "Meow!".

**Challenge: (Optional)**
Add a static method info() to Animal that returns "I am an animal class."

## Session 3: Iterators and Generators

Goal: Master custom iteration and generator functions.

### 1. Definition:

- Iterator: An object with a next() method that returns { value, done }.
- Generator: A function (function*) that yields values sequentially.
- Use Symbol.iterator to define custom iteration logic.

**References:**

- [MDN: Iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)
- [MDN: Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

### 2. Tutorial:

Create iterators.js:

```javascript
// Generator example
function* countToThree() {
  yield 1;
  yield 2;
  yield 3;
}

// Custom iterable object
const customIterable = {
  [Symbol.iterator]: function* () {
    yield "a";
    yield "b";
  },
};

// Usage:
const generator = countToThree();
console.log(generator.next().value); // 1

for (const item of customIterable) {
  console.log(item); // "a", "b"
}
```

### 3. Exercise:
Create a generator evenNumbers that yields the first 3 even numbers.

**Challenge:**
Build a custom iterable range that yields numbers from start to end.

## Session 13: Command Line Interfaces (CLI)

Goal: Build a command-line tool using Node.js with user interaction and configuration.

### 1. Definitions

- CLI: Command-line interface that accepts arguments/flags.
- Child Processes: Spawning system commands (e.g., child_process module).
- Configuration Files: Storing user preferences (e.g., .json or .rc files).

**MDN Reference:**

Template Literals (for CLI output
Process.argv (Node.js context)

### 2. Tutorial
#### Step 1: Parse Command-Line Arguments
```javascript
// Use process.argv  
const args = process.argv.slice(2);  
const [command, input] = args;  
```

#### Step 2: Use chalk for Colored Output
```bash
npm install chalk  
```
```javascript
import chalk from 'chalk';  
console.log(chalk.green('Success!'), chalk.red.bold('Error!'));  
```

#### Step 3: Save Configuration
```javascript
const fs = require('fs');  
const configPath = './.cli-config.json';  
fs.writeFileSync(configPath, JSON.stringify({ theme: 'dark' }));  
```

### 3. Exercise: Password Generator CLI

Build a CLI tool that generates random passwords.

**Requirements:**

- Accept flags: --length (default: 12), --uppercase, --numbers.
- Save preferences to .pw-config.json.
- Output password in green.

Sample Command:
```bash
node pwgen.js --length 16 --uppercase --numbers  
```

**Hints:**

- Use process.argv or yargs for argument parsing.
- Generate passwords with Math.random() and character sets.


## Session 14: Modules, Packages & NPM

Goal: Create reusable modules and publish them to npm.

### 1. Definitions

- ES Modules: import/export syntax (vs. CommonJS require).
- NPM/Yarn: Package Manager

**MDN Reference:**

- [import/export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [Object Exports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

### 2. Tutorial
#### Step 1: Create a Module
```javascript
// stringUtils.js  
export function capitalize(str) {  
  return str.charAt(0).toUpperCase() + str.slice(1);  
}  
```
#### Step 2: Run using NPM
```bash
npm init  
npm install
npm start
```

#### 3. Exercise: Math Utility Module

- Create an npm module with math functions (sum, average, median).

**Requirements:**

- Export functions using ES modules.
- Write JSDoc comments.
- Publish to npm (or a private registry).

**Hints:**

- Handle edge cases (e.g., empty arrays).
- Use npm test with Jest (Session 10).

## Session 15: Streams & Buffers

Goal: Process large datasets efficiently using streams and buffers.

### 1. Definitions

- Stream: Sequential data flow (readable, writable, duplex).
- Buffer: Temporary storage for binary data.

**MDN Reference:**

- [Typed Arrays (Buffer)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
- [Streams API (Node.js uses its own streams)](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)

### 2. Tutorial
#### Step 0: Download a Dataser from Hugging Face

- [Hugging Datasets](https://huggingface.co/datasets)

> [!NOTE]
> Search for `json` or `csv` for easier comprehension

#### Step 1: Read File with Stream
```javascript
// stream.js
import { createReadStream } from 'fs';  
const stream = createReadStream('largefile.txt', 'utf-8');  
stream.on('data', chunk => console.log('Chunk:', chunk.length));  
```

#### Step 2: Transform Stream
```javascript
import { Transform } from 'stream';  
const uppercaseTransform = new Transform({  
  transform(chunk, encoding, callback) {  
    this.push(chunk.toString().toUpperCase());  
    callback();  
  }  
});  
```
### 3. Exercise: Log File Analyzer

Process a 1GB log file to count HTTP status codes (200, 404, 500).

**Requirements:**

- Use streams to avoid loading the entire file.
- Output counts as JSON.

Sample Log Line:
```log
2023-10-01 GET /api/users 200  
```

**Hints:**

- Split lines with \n.
- Use readline module for line-by-line processing.

## Session 16: Testing & TDD with Jest

Goal: Write tests and adopt test-driven development (TDD).

### 1. Definitions

- Unit Test: Testing individual functions in isolation.
- Mocking: Simulating external dependencies (e.g., APIs).

**MDN Reference:**

- [Function Mocks (Jest-specific)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Jest)
- [Jest](https://jestjs.io/docs/getting-started)

### 2. Tutorial
#### Step 1: Write a Test
```javascript
// sum.test.js  
import { sum } from './math.js';  

test('adds 1 + 2 to equal 3', () => {  
  expect(sum(1, 2)).toBe(3);  
});  
```

#### Step 2: Mock an API Call
```javascript
describe('Date mocking example', () => {
  // Save the real Date object for later restoration.
  const RealDate = Date;
  // Define a fixed date – this will be our "today".
  const fixedDate = new Date('2025-01-01T00:00:00.000Z');

  beforeAll(() => {
    // Override the global Date constructor.
    global.Date = class extends RealDate {
      constructor(date) {
        // If a date is passed, call the real constructor.
        if (date) {
          return super(date);
        }
        // Otherwise, return the fixed date.
        return fixedDate;
      }
    };

    // Also override Date.now() to return the fixed timestamp.
    Date.now = jest.fn(() => fixedDate.getTime());
  });

  afterAll(() => {
    // Restore the original Date constructor and Date.now.
    global.Date = RealDate;
    jest.restoreAllMocks();
  });

  test('new Date() returns the fixed date', () => {
    const today = new Date();
    expect(today).toEqual(fixedDate);
  });

  test('Date.now() returns the fixed timestamp', () => {
    expect(Date.now()).toEqual(fixedDate.getTime());
  });
});
```

### 3. Exercise: Test a Currency Converter

Write tests for a function that converts USD to EUR using a mock exchange rate API.

**Requirements:**

- Test successful conversion.
- Test API failure handling.

**Function:**
```javascript
export async function convertUSDToEUR(amount) {  
  const rate = await fetchExchangeRate(); // Assume this calls an API  
  return amount * rate;  
}
```

## Session 17: Hands on Mini Project

Goal: Build a CLI Tool to create a snapshot of you development environment. You should be able to define where your projects folder are and how to define the naming pattern for the snapshot.

### 3. Exercise: Todo API

Build a CLI for a TODO app. Save all interactions on a file

**Requirements:**

- Create TODO
- Delete TODO
- Update TODO

**Challenge (Optional)**

- Create a way to prioritize your tasks
- Add a Description to your tasks
- PRO: Create Subtasks inside Description

## Sessions 18 and 19: CLI Project

Goal: Build a CLI tool that interacts with a public API (no authentication required) to solve a real-world problem.

### Project Overview

- Choose an API from the Public APIs List and create a CLI tool that interacts with at least one endpoint. The tool should provide meaningful functionality, such as fetching data, processing it, and presenting it in a user-friendly way.

### Project Requirements (20 Points)
1. API Selection (2 Points)
    1.1: Choose an API from the Public APIs List that does not require authentication.
    1.2: Justify your choice in the README.md (e.g., why this API is interesting or useful).

2. CLI Functionality (5 Points)
    2.1: Fetch data from at least one endpoint of the chosen API.
    2.2: Process the data (e.g., filter, sort, or transform it).
    2.3: Display the results in a user-friendly format (e.g., table, JSON, or plain text).
    2.4: Accept command-line arguments/flags (e.g., --sort, --filter, --output).
    2.5: Provide a --help flag to display usage instructions.

3. Code Quality (4 Points)
    3.1: Use ES6+ features (e.g., const, let, arrow functions, destructuring).
    3.2: Modularize code into reusable functions/classes.
    3.3: Use a linter (e.g., ESLint) with a standard config (e.g., Airbnb).
    3.4: Handle errors gracefully (e.g., invalid API responses, network issues).

4. Documentation (3 Points)
    4.1: Write a detailed README.md with:
        Installation instructions.
        Usage examples.
        API endpoint documentation.
    4.2: Add JSDoc comments for all functions/classes.
    4.3: Include a CHANGELOG.md for version history.

5. Testing (3 Points)
    5.1: Write unit tests for core functionality (e.g., data processing).
    5.2: Mock API responses for testing (e.g., using nock or jest.mock).
    5.3: Achieve at least 80% test coverage.

6. Git & Version Control (2 Points)
    6.1: Use Git for version control with meaningful commit messages.
    6.2: Tag releases (e.g., v1.0.0) following semantic versioning.

7. Bonus Features (1 Point)
    7.1: Add a creative feature (e.g., save results to a file, support multiple output formats).

#### Example Project: Weather CLI Tool
API: OpenWeatherMap (Free tier, no auth required).
Features

    Fetch current weather for a city.
    Display temperature, humidity, and weather conditions.
    Accept a --city flag to specify the location.

Commands
```bash
node weather.js --city "New York"  
```
Output
```bash
🌤️ Weather in New York:  
- Temperature: 15°C  
- Humidity: 60%  
- Conditions: Cloudy  
```
