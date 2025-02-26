import { sum, subtract} from "../math/math.js";

test('2 + 2 is equal to 4', () => {
    let result = 2+2;
    expect(result).toBe(4);
});

test('2 + 2 is equal to 4', () => {
    let result = sum(3,2);
    expect(result).toBe(5);
});

test('0 - 2 is equal to -2', () => {
    let result = 0-2;
    expect(result).not.toBeNull()
    expect(result).not.toBeNaN()
    expect(result).toBeLessThan(-1);
    expect(result).not.toBeNull();
    expect(result).toBeDefined();
});

test('false-2 is equal to Error()', () => {
    let a = false;
    let b = 2;
    let expectedResult = -2;
    expect(a-b).toBe(expectedResult)
});

test('subtract(2,2)=0', () => {
    let a = 2;
    let b = 2;
    let result = subtract(a,b);
    let expectedResult = 0;
    expect(result).toBe(expectedResult);
});

test('subtract(false,2)=0', () => {
    let a = false;
    let b = 2;
    expect(()=>subtract(a,b)).toThrow(Error);
    expect(()=>subtract(a,b)).toThrow("not possible");
});

test('subtract(2,false)=0', () => {
    let b = 'false';
    let a = 2;
    expect(()=>subtract(a,b)).toThrow(Error);
    expect(()=>subtract(a,b)).toThrow("not possible");
});

test('subtract(undefined,2)=0', () => {
    let a = undefined;
    let b = 2;
    expect(()=>subtract(a,b)).toThrow(Error);
    expect(()=>subtract(a,b)).toThrow("not possible");
});

test('subtract(2,undefined)=0', () => {
    let b = 'undefined';
    let a = 2;
    expect(()=>subtract(a,b)).toThrow(Error);
    expect(()=>subtract(a,b)).toThrow("not possible");
});

test('subtract(null,2)=0', () => {
    let a = null;
    let b = 2;
    expect(()=>subtract(a,b)).toThrow(Error);
    expect(()=>subtract(a,b)).toThrow("not possible");
});

test('subtract(2,null)=0', () => {
    let b = 'null';
    let a = 2;
    expect(()=>subtract(a,b)).toThrow(Error);
    expect(()=>subtract(a,b)).toThrow("not possible");
});