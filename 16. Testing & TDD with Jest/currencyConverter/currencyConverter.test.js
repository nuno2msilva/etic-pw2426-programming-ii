import { convertUSDToEUR } from './currencyConverter.js';
import { jest } from "jest";

jest.mock('currencyConverter');

describe("Mocking Currency Converter Test Suite", () =>{

  test("Testing USD to EUR Conversion",() => {
    const mockedRate = 0.85;      
    let ammount = 1;
          expect(convertUSDToEUR).toBe(1,5);
  })
});