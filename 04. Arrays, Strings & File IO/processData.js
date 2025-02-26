import fs from "node:fs";

try {
  // Argument Handling
  const args = process.argv.slice(2);
  if (!args.length) throw new Error("Input file required");

  const inputFile = args[0];
  const verbose = args.includes("--verbose");
  const outputFile = args.filter(a => a !== inputFile && a !== "--verbose")[0] || "output.json";

  // File Validation
  if (!fs.existsSync(inputFile)) {
    throw new Error(`Input file not found: ${inputFile}`);
  }

  // Data Processing
  const csvData = fs.readFileSync(inputFile, "utf-8");
  const [header, ...rows] = csvData.split("\n");

  const validData = [];
  const processingErrors = [];

  rows.forEach((rawRow, index) => {
    const lineNumber = index + 2;
    const row = rawRow.trim();

    const cells = row.split(",");
    const errors = [];

    // Unified field validation
    const validateField = (value, field) => !value && errors.push(`Missing '${field}'`);
    
    if (cells.length !== 3) {
        if (!cells[0]) validateField(cells[0], 'name');
        if (!cells[1]) validateField(cells[1], 'email');
        if (!cells[2]) validateField(cells[2], 'age');
    } else {
        validateField(cells[0], 'name');
        validateField(cells[1], 'email');
        validateField(cells[2], 'age');
    }

    // Age-specific validation
    if (cells[2] && isNaN(parseInt(cells[2]))) {
        errors.push("Invalid 'age'");
    }

    if (errors.length) {
        processingErrors.push({ line: lineNumber, error: errors.join(", ") });
    } else {
        validData.push({
            name: cells[0],
            email: cells[1],
            age: parseInt(cells[2]),
        });
    }
});

  // If  !data = error
  if (validData.length === 0) throw new Error("No valid data processed");

  // If data = compact print
  fs.writeFileSync(outputFile, `[\n${validData.map(obj => JSON.stringify(obj)).join(',\n')}\n]`);

  // Prints Reason for Skipping Row
  if (verbose && processingErrors.length) {
    processingErrors.forEach(({ line, error }) => {
      console.log(`Skipped Row ${line}: ${error}`);
    });
  }

  // Success!
  console.log(
    `Successfully processed ${validData.length} records to ${outputFile}`,
  );
} 

// Error Handler
catch (error) {
  console.error(`Error: ${error.message}`);
}