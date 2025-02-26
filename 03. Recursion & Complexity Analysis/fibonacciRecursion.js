// Solve Fibonacci Number using recursion, then memoization (PART 1).

function fibonacci(n) {
    
    // Base case: return n if it is either 0 or 1
    if (n <= 1) return n;
    
    // Recursive case: sum of previous two Fibonacci numbers
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Execution:
console.log(fibonacci(6)); // Expected result: 8