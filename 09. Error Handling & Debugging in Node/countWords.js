import fs from "fs";

export function countWords(filename) {
  console.time("File Processing Time"); // Start timer
  try {
    const data = fs.readFileSync(filename, "utf8");
    const words = data
      .replace(/[^\w\s]/g, "") // Remove punctuations
      .split(/\s+/) // Split with whitespace
      .filter((word) => word.length > 0);

    console.timeEnd("File Processing Time");
    return words.length;
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return 0;
  }
}

// Execution:
console.log(countWords("poem.txt"));
