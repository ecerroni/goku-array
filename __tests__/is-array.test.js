import GokuArray from '../src/index'

const arrayOfPrimitives = [1, 2, 2, 3, 3, 4, 1]

test('It should be an array', () => {
  const arr = new GokuArray(arrayOfPrimitives)
  expect(Array.isArray(arr)).toBe(true)
})

test('It should inherit Array methods', () => {
  const arr = new GokuArray(arrayOfPrimitives)
  const newArr = arr.filter(item => item === 1)
  expect(Array.isArray(newArr)).toBe(true)
  expect(newArr.length === 2).toBe(true)
})
