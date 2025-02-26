import { countWords } from './countWords.js';
import fs from "fs";

test('countWords handles missing file correctly', () => {
  const result = countWords('nonexistent.txt');
  expect(result).toBe(0);
});

test('countWords counts words correctly', () => {
  // Create a temporary test file
  const testFile = 'test.txt';
  fs.writeFileSync(testFile, 'Hello, world! This is a test.');

  const result = countWords(testFile);
  expect(result).toBe(6);

  // Clean up the test file
  fs.unlinkSync(testFile);
});