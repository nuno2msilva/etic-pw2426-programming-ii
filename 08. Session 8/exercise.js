function knapsack(items, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  for (const item of items) {
    for (let w = capacity; w >= item.weight; w--) {
      const valueIfTaken = dp[w - item.weight] + item.value;
      if (valueIfTaken > dp[w]) {
        dp[w] = valueIfTaken;
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

console.log(knapsack(items, capacity)); // Output: 50 ✅



function knapsack(items,capacity) {
  
}