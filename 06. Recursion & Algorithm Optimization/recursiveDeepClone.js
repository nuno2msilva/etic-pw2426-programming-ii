function deepClone(obj) {
    
    // Handle primitives and null/undefined immediately
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // Create new container (array or object)
    const clone = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
       
        // Same prototype-safe property check as flattenObject
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            
            // Recursive clone for nested objects/arrays
            if (typeof value === 'object' && value !== null) {
                clone[key] = deepClone(value);
            } else {
                clone[key] = value; // Direct assignment for primitives
            }
        }
    }

    return clone;
}

// Sample
const nested = {
    a: 1,
    b: { c: 2, d: { e: 3 } },
    f: [4, 5],
};

// Execution
const cloned = deepClone(nested);
nested.b.d.e = 99;    // Modify original nested value
nested.f.push(6);     // Modify original array

console.log('Original:', nested);
console.log('Cloned:', cloned);