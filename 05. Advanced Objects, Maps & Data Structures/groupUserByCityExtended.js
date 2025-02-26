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

  const cityMap = new Map();
  const processingErrors = [];

  rows.forEach((rawRow, index) => {
    const lineNumber = index + 2;
    const row = rawRow.trim();
    const cells = row.split(",");
    const errors = [];

    // Unified field validation
    const validateField = (value, field) => !value && errors.push(`Missing '${field}'`);
    
    if (cells.length !== 3) {
        if (!cells[0]) validateField(cells[0], 'id');
        if (!cells[1]) validateField(cells[1], 'name');
        if (!cells[2]) validateField(cells[2], 'city');
    } else {
        validateField(cells[0], 'id');
        validateField(cells[1], 'name');
        validateField(cells[2], 'city');
    }

    // ID-specific validation
    if (cells[0] && isNaN(parseInt(cells[0]))) {
        errors.push("Invalid 'id'");
    }

    if (errors.length) {
        processingErrors.push({ line: lineNumber, error: errors.join(", ") });
    } else {
        const user = {
            id: parseInt(cells[0]),
            name: cells[1],
            city: cells[2]
        };
        
        if (!cityMap.has(user.city)) {
            cityMap.set(user.city, []);
        }
        cityMap.get(user.city).push(user);
    }
  });

  // If no data = error
  if (cityMap.size === 0) throw new Error("No valid data processed");

  // Custom Map formatting
  const mapEntries = Array.from(cityMap).map(([city, users]) => 
    `  '${city}' => [\n${users.map(u => `    ${JSON.stringify(u)}`).join(',\n')}\n  ]`
  );

  fs.writeFileSync(
    outputFile,
    `Map(${cityMap.size}) {\n${mapEntries.join(',\n')}\n}`
  );

  // Print skipped rows
  if (verbose && processingErrors.length) {
    processingErrors.forEach(({ line, error }) => {
      console.log(`Skipped Row ${line}: ${error}`);
    });
  }

  // Success message
  const totalUsers = Array.from(cityMap.values()).flat().length;
  console.log(`Successfully processed ${totalUsers} users in ${cityMap.size} cities to ${outputFile}`);

} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}