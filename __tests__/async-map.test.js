
import GokuArray from '../src/index';
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve(true), ms * 1000));
}

const simpleArray = [1, 2, 3]

test('It should return pending using the built-in map function', async () => {
  const arr = await simpleArray.map(async item => {
    const promise = await timeout(item)
    return promise
  })
  expect(arr.filter(obj => Promise.resolve(obj) == obj)).toHaveLength(simpleArray.length)
});

test('It should await for the promises to resolve', async () => {
  const arr = new GokuArray(simpleArray)
  const newArr = await arr.asyncMap(item => timeout(item))
  expect([...newArr]).toEqual([true, true, true])
  expect(newArr.filter(obj => Promise.resolve(obj) == obj)).toHaveLength(0)
  expect(newArr.filter(item => item === true)).toHaveLength(simpleArray.length)
});