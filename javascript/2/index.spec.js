const assert = require("assert");
const promiseReduce = require("./index.js");

// fns
const fn1 = () => {
  console.log("fn1");
  return Promise.resolve(1);
};

const fn2 = () => {
  return new Promise(resolve => {
    console.log("fn2");
    setTimeout(() => resolve(2), 1000);
  });
};

const fn3 = () => Promise.resolve("ye");
const fn4 = () => Promise.resolve("s!");
const fn5 = () => Promise.resolve("World");
const fn6 = () => Promise.resolve("!");
const fn7 = () => Promise.resolve(2);
const fn8 = () => Promise.resolve(4);

// test
(async () => {
  //default test
  console.log("default test\n");

  await promiseReduce(
    [fn1, fn2],
    function (memo, value) {
      console.log("reduce");
      return memo * value;
    },
    1
  ).then(console.log);

  //my test
  console.log("\n\nmy tests");

  const result2 = await promiseReduce([], (acc, val) => acc * val, 10);
  const result3 = await promiseReduce([fn3, fn4], (acc, val) => acc + val, "");
  const result4 = await promiseReduce([fn5, fn6], (acc, val) => acc + val, "Hello ");
  const result5 = await promiseReduce([fn7, fn8], (acc, val) => acc * val, 1);
  const result6 = await promiseReduce([fn5, fn6], (acc, val) => acc * val, 1);
  const result7 = await promiseReduce([fn7, fn6], (acc, val) => `${acc} ${val}`, "World");

  // test
  assert.deepStrictEqual(result2, 10);
  assert.deepStrictEqual(result3, "yes!");
  assert.deepStrictEqual(result4, "Hello World!");
  assert.deepStrictEqual(result5, 8);
  assert.deepStrictEqual(result6, NaN);
  assert.deepStrictEqual(result7, "World 2 !");

  console.log("ok");
})();
