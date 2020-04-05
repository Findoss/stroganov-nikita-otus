const assert = require("assert");
const { sumNums, curry } = require("./index.js");

const sum = curry(sumNums);

// test sumNums
assert.deepStrictEqual(sumNums(1, 2, 3, 4), 10);

// test args array
assert.deepStrictEqual(sum([1, [2, [3, 4]]])(), 10);
assert.deepStrictEqual(sum([[1, 2], 3])(4)(), 10);
assert.deepStrictEqual(sum([1, 2])(3)(4)(), 10);

// test args 0
assert.deepStrictEqual(sum(0)(0)(), 0);
assert.deepStrictEqual(sum(), 0);

// test args
assert.deepStrictEqual(sum(1, 2, 3, 4)(), 10);
assert.deepStrictEqual(sum(1, 2, 3)(4)(), 10);
assert.deepStrictEqual(sum(1, 2)(3)(4)(), 10);
assert.deepStrictEqual(sum(1)(2)(3)(4)(), 10);
assert.deepStrictEqual(sum(1)(2, 3, 4)(), 10);
assert.deepStrictEqual(sum(1)(2)(3, 4)(), 10);
assert.deepStrictEqual(sum(1, 2)(3, -4)(), 2);
assert.deepStrictEqual(sum(1, 2)(-3, 4)(), 4);
assert.deepStrictEqual(sum(1.45, 2)(3.55, 4.11)(), 11.11);

// error
assert.throws(() => sum(1, 2)()(3));
assert.deepStrictEqual(typeof sum(1, 2)(3), "function");
assert.deepStrictEqual(typeof sum(1, 2)(), "number");
assert.deepStrictEqual(sum(1, "a")(), NaN);

console.log("tests - ok");
