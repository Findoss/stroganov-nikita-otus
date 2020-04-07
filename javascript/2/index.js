"use strict";

/**
 * A function to execute on each function in the array/
 * 
 * @callback reduce
 * @param {number|string} accumulator The accumulator accumulates callback's return values. It is the accumulated value previously returned in the last invocation of the callback or `initialValue`, if it was supplied.
 * @param {number|string} currentValue The current function result being processed in the array.
 * @return {*}
 */

/**
 * promiseReduce - The `reduce()` method executes a reducer function 
 * (that you provide) on each function of the array, resulting in a single output value.
 * 
 * @async
 * @function promiseReduce
 * @param {function[]} asyncFunctions Array async functions
 * @param {reduce} reduce A function `reduce(accumulator, currentValue)` to execute on each function in the array
 * @param {number|string} initialValue A value to use as the first argument to the first call of the callback.
 * @return {number|string} The single value that results from the reduction.
 */
async function promiseReduce(asyncFunctions, reduce, initialValue) {
  let acc = initialValue;
  for await (const fn of asyncFunctions) {
    acc = reduce(acc, await fn());
  }
  return acc;
}

module.exports = promiseReduce;
