function fibonacci(n){
    const memo = new Map()
    function fib(n) {
        if (n <= 0) return n;
        if (n <= 1) return n;  
        if (memo.has(n)) return memo.get(n);  
        const result = fib(n - 1) + fib(n - 2);  
        memo.set(n, result);  
        return result;  
    }
    return fib(n);
}     

console.time("total time")
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
console.timeEnd("total time")