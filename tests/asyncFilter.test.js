import GokuArray from '../src/index';
import { CLIENT_RENEG_LIMIT } from 'tls';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve(ms), ms));
}

const simpleArray = [1, 2, 3]

test('It should return pending using the built-in filter function', async () => {
  const arr = await simpleArray.filter(async item => {
    const obj = await timeout(item)
    console.log(obj, item)
    return obj === item
  })
  console.log(arr)
  expect(arr).toHaveLength(simpleArray.length)
});

test('It should await for the promises to resolve', async () => {
  const arr = new GokuArray(simpleArray)
  const newArr = await arr.asyncFilter(async item => {
    const obj = await timeout(item)
    return obj === item
  })
  expect(newArr.filter(obj  => Promise.resolve(obj) == obj)).toHaveLength(0)
  expect(newArr.filter(item  => typeof item === 'number')).toHaveLength(simpleArray.length)
});