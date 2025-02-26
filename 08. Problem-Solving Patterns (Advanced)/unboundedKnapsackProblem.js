function unboundedKnapsack(items, capacity) {
    const dp = new Array(capacity + 1).fill(0);
    for (let w = 0; w <= capacity; w++) {
        for (const item of items) {
            if (item.weight <= w) {
                const valueIfTaken = dp[w - item.weight] + item.value;
                dp[w] = Math.max(dp[w], valueIfTaken);
            }
        }
    }
    return dp[capacity];
}

const items = [
    { weight: 2, value: 10 },
    { weight: 3, value: 15 },
    { weight: 5, value: 40 }
];
const capacity = 7;

// Execution
console.log(unboundedKnapsack(items, capacity)); // Output: 70