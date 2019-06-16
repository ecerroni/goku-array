import GokuArray from '../src/index';
import { objectExpression } from '@babel/types';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve(item), ms));
}

const simpleArray = [1, 2, 3]

// test('It should return pending using the built-in filter function', async () => {
//   const newArr = await simpleArray.reduce(async (arr, item) => [...arr, await timeout(item)], [])
//   console.log(newArr)
//   expect(Promise.resolve(newArr) == newArr).toEqual(true)
// });

test('It should await for the promises to resolve', async () => {
  // const arr = new GokuArray(simpleArray)
  // const newArr = arr.reduce(async (arr, item) => [...arr, await timeout(item)], [])
  // expect(newArr).toEqual(simpleArray)
});