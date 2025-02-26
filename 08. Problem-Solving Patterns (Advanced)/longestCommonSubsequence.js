function longestCommonSubsequence(text1, text2) {
    const text1Length = text1.length;
    const text2Length = text2.length;
    const dp = Array.from({ length: text1Length + 1 }, () => Array(text2Length + 1).fill(0));

    for (let row = 1; row <= text1Length; row++) {
        for (let col = 1; col <= text2Length; col++) {
            dp[row][col] = text1[row - 1] === text2[col - 1]
                ? dp[row - 1][col - 1] + 1
                : Math.max(dp[row - 1][col], dp[row][col - 1]);
        }
    }

    let result = '';
    let row = text1Length, col = text2Length;
    while (row > 0 && col > 0) {
        if (text1[row - 1] === text2[col - 1]) {
            result = text1[row-- - 1] + result;
            col--;
        } else {
            dp[row - 1][col] > dp[row][col - 1] ? row-- : col--;
        }
    }
    
    return result;
}


// Execution
console.log(longestCommonSubsequence("teacher", "treasure")); // Expected: "tear"