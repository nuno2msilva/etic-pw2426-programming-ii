function flattenObject(obj, prefix = "", result = {}) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = prefix ? `${prefix}.${key}` : key; // Build key path

            if (typeof obj[key] === "object" && obj[key] !== null) {
                flattenObject(obj[key], newKey, result); // Recurse for nested objects/arrays
            } else {
                result[newKey] = obj[key]; // Store non-object values
            }
        }
    }
    return result;
}

// Sample
const nested = {
    a: 1,
    b: { c: 2, d: { e: 3 } },
    f: [4, 5],
};

// Execution
console.log(flattenObject(nested));
