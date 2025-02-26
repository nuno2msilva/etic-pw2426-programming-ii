// Write a recursive power(x, n) function (calculate x^n).

function power(x, n) {
    
    // Base case: power of 0 is 1
    if (n === 0) return 1;
    
    // Recursive case: multiply x by the result of power(x, n - 1)
    return x * power(x, n - 1);
}

console.log(power(2, 3)); // 2^3 = 8
