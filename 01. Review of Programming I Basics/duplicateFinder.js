// Write a function findDuplicates(arr) that returns an array of duplicate elements.

function findDuplicates(arr) {
    let seenNumbers = new Set(); // Create a Set to keep track of numbers we've already seen
    let duplicates = new Set(); // Create another Set to store duplicate values

    for (let num of arr) { // Loop through each number in the input array
        if (seenNumbers.has(num)) { // If the number is already in 'seen', it means it's a duplicate
            duplicates.add(num); // Add the duplicate number to 'duplicates'
        } else {
            seenNumbers.add(num); // Otherwise, mark this number as seen
        }
    }
    return Array.from(duplicates); // Convert the 'duplicates' Set into an array before returning
}

// Execution:
console.log(findDuplicates([1, 2, 3, 4, 5, 2, 3, 6])); // Expected output: [2, 3]
