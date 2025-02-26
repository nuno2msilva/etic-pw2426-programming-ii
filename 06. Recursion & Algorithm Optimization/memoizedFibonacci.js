const fibonacci = (function() { 
    const memo = new Map(); 
    return function(n) { // Use a closure to encapsulate the cache ("memo")
        if (n <= 0) return 0; //  Handle n ≤ 0 gracefully
        if (n === 1) return 1; 
        if (memo.has(n)) return memo.get(n); 
        const result = fibonacci(n - 1) + fibonacci(n - 2);
        memo.set(n, result); 
        return result;
    };
})();

console.time("Total Time");

console.time("fibonacci1");
console.log(fibonacci(10));
console.timeEnd("fibonacci1");

console.time("fibonacci2");
console.log(fibonacci(20));
console.timeEnd("fibonacci2");

console.time("fibonacci3");
console.log(fibonacci(30));
console.timeEnd("fibonacci3");

console.time("fibonacci4");
console.log(fibonacci(40));
console.timeEnd("fibonacci4");

console.time("fibonacci5");
console.log(fibonacci(50));
console.timeEnd("fibonacci5");

console.timeEnd("Total Time");
