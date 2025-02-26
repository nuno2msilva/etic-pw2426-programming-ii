// Print all permutations of a string using backtracking.

function permutation(string) {
    const result = []; // This will store all the permutations
  
    function backtrack(path, remaining) {
      // If no characters left, add the current path (permutation) to the result
      if (remaining.length === 0) {
        result.push(path);
        return;
      }
  
      // Loop through all remaining characters
      for (let i = 0; i < remaining.length; i++) {
        // Choose the current character and form a new string without it
        const newPath = path + remaining[i];
        const newRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
  
        // Recursively generate permutations with the new path and remaining characters
        backtrack(newPath, newRemaining);
      }
    }
  
    // Start backtracking with an empty path and the full string as remaining
    backtrack('', string);
  
    return result; // Return all permutations
  }
  
  // Execution:
  console.log(permutation('abc'));
  