// Solve Contains Duplicate with O(n) time and O(n) space.

function containsDuplicate(numbers) {
    let seen = new Set(); // O(n) space
    for (let number of numbers) { // O(n) time
        if (seen.has(number)) return true; // Returns 'true' if found duplicates
        seen.add(number); // Stores number
    }
    return false; // Returns 'false' if found no duplicates
}

// Execution:
console.log(containsDuplicate([1, 2, 3, 4, 4])); // true
console.log(containsDuplicate([1, 2, 3, 4, 5])); // false