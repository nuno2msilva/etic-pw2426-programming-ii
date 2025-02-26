// Explain why the recursive Fibonacci has O(2^n) time complexity.
//
// The recursive Fibonacci algorithm has a time complexity of O(2n)
// Because it repeatedly recalculates the same Fibonacci numbers, 
// Leading to an exponential growth in the number of function calls.
//
// For n=5, the recursive tree looks like this:
//
//                fib(5)
//               /      \
//          fib(4)     fib(3)
//          /    \     /    \
//      fib(3) fib(2) fib(2) fib(1)
//      /   \   /   \   /   \
//   fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)
//    /   \
// fib(1) fib(0)
//
// The number of function calls grows exponentially with n, leading to O(2n) time complexity.