import GokuArray from '../src/index'

const array = [1, 2, 2, 3, 3, 4, 1]

test('It should return plain array', () => {
  const arr = new GokuArray(array)
  // check deep equality
  expect(arr).not.toEqual([1, 2, 2, 3, 3, 4, 1])
  expect(arr.toArray()).toEqual([1, 2, 2, 3, 3, 4, 1])
})
