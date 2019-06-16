import GokuArray from '../src/index';
import { CLIENT_RENEG_LIMIT } from 'tls';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve(true), ms));
}

const simpleArray = [1, 2, 3]

test('It should return pending using the built-in map function', async () => {
  const arr = await simpleArray.map(item => timeout(item))
  expect(arr.filter(obj  => Promise.resolve(obj) == obj)).toHaveLength(simpleArray.length)
});

test('It should await for the promises to resolve', async () => {
  const arr = new GokuArray(simpleArray)
  const newArr = await arr.asyncMap(item => timeout(item))
  expect(newArr.filter(obj  => Promise.resolve(obj) == obj)).toHaveLength(0)
  expect(newArr.filter(item  => item === true)).toHaveLength(simpleArray.length)
});