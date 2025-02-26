import { sum, average, median } from "./modules.js";

describe("Testing the 'sum' operator", () => {
  test("Adds all numbers in the array?", () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(sum([10, 20, 30])).toBe(60);
  });

  test("Returns 0 for an empty array?", () => {
    expect(sum([])).toBe(0);
  });
});

describe("Testing the 'average' operator", () => {
  test("Calculates the average of numbers?", () => {
    expect(average([1, 2, 3])).toBe(2);
    expect(average([10, 20, 30])).toBe(20);
  });

  test("Returns 0 for an empty array?", () => {
    expect(average([])).toBe(0);
  });
});

describe("Testing the 'median' operator", () => {
  test("Finds the median for ODD-length arrays?", () => {
    expect(median([1, 2, 3])).toBe(2);
    expect(median([10, 20, 30, 40, 50])).toBe(30);
  });

  test("Finds the median for EVEN-length arrays?", () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([10, 20, 30, 40])).toBe(25);
  });

  test("Returns 0 for an empty array?", () => {
    expect(median([])).toBe(0);
  });
});