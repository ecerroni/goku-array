import GokuArray from '../src/index'

const array = [1, 2, 2, 3, 3, 4, 1]

test('It should chain own methods', () => {
  const arr = new GokuArray(array)
  const uniqueSortedPlainArray = arr
    .unique()
    .sortItems()
    .toArray()
  expect(uniqueSortedPlainArray).toEqual([1, 2, 3, 4])
})

test('It should chain onwn methods and array methods', () => {
  const arr = new GokuArray(array)
  const uniqueSortedPlainArray = arr
    .unique()
    .map(i => i)
    .filter(i => !!i)
    .sortItems()
    .sort()
    .toArray()
    .sort()
  expect(uniqueSortedPlainArray).toEqual([1, 2, 3, 4])
})
