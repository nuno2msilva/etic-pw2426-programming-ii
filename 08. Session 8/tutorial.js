
/* Reference code */
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


/* Adapt code above to the exercise below */
    Exercise: 0/1 Knapsack Problem

    Given items with weights and values, maximize the value in a knapsack of capacity W.

Sample Input:

const items = [  
  { weight: 2, value: 10 },  
  { weight: 3, value: 15 },  
  { weight: 5, value: 40 }  
];  
const capacity = 7;  

Expected Output: 50 (Items 0 and 2 -> 10 + 40 = 50 with total weight 7.

Requirements:

    Use memoization or a DP table.
    Handle up to 1000 items (optimize for time).

/* Comment every single line of the new code in the end of it as if you were teaching it */