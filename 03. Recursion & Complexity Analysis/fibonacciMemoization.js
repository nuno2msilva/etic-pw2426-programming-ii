// Solve Fibonacci Number using recursion, then memoization (PART 2).

function fibonacci(n, memoization = {}) {
    
    // Check if result is already stored in memo
    if (n in memoization) return memoization[n];

    // Base case: return n if it is 0 or 1
    if (n <= 1) return n;

    // Store computed result in 'memoization' for efficiency
    memoization[n] = fibonacci(n - 1, memoization) + fibonacci(n - 2, memoization);
    return memoization[n];
}

// Execution:
console.log(fibonacci(6)); // Expected result: 8
