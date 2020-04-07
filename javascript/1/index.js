"use strict";

/**
 * Curry function
 * 
 * @function curry
 * @param {function} fn Function for correlation
 * @return If no arguments then return result `fn` else return function partial currying
 */
const curry = fn => (...args) => {
  if (args.length) {
    return curry(fn.bind(null, ...args));
  } else {
    return fn(...args);
  }
};

/**
 * Sum numbers
 * 
 * @function sumNums
 * @param {number|number[]} args Numbers or array numbers
 * @return {number} sum
 */
function sumNums(...args) {
  return args.flat(Infinity).reduce((a, v) => Number(a) + Number(v), 0);
}

module.exports = { curry, sumNums };