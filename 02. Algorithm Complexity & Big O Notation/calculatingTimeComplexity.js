// Calculate the time complexity of this code.

const n = 1_000_000; // Input size

for (let i = 0; i < n; i++) { // Outer loop: runs 'n' times
    for (let j = i; j < n; j++) { // Inner loop: runs 'n - i' times for each 'i'
        console.log(i + j); // Print the sum of i and j
    }
}

// Time Complexity: O(n²)
// - Outer loop runs 'n' times.
// - Inner loop runs 'n - i' times for each 'i'.
//   - When i = 0, inner loop runs 'n' times.
//   - When i = 1, inner loop runs 'n - 1' times.
//   - ...
//   - When i = n-1, inner loop runs 1 time.
// - Total iterations = n + (n-1) + (n-2) + ... + 1 = n(n + 1)/2.
// - This is O(n²) because the work grows much faster as n increases (quadratically).
