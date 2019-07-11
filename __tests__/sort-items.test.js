import GokuArray from '../src/index'

const arrayOfNumbers = [2, 1, 3]
const arrayOfStrings = ['a', 'c', 'b']
const arrayOfObjects = [
  { id: 1, text: 'a' },
  { id: 3, text: 'c' },
  { id: 2, text: 'b' }
]

// Numbers
test('It should sort the array of numbers ascending', async () => {
  let arr = new GokuArray(arrayOfNumbers)
  arr.sortItems()
  expect([...arr]).toEqual([1, 2, 3])
  arr = new GokuArray(arrayOfNumbers)
  arr.sortItems({ ordering: 'ASC' })
  expect([...arr]).toEqual([1, 2, 3])
})

test('It should sort the array of numbers descending', async () => {
  let arr = new GokuArray(arrayOfNumbers)
  arr.sortItems({ ordering: 'DESC' })
  expect([...arr]).toEqual([3, 2, 1])
})

// Strings
test('It should sort the array of strings ascending', async () => {
  let arr = new GokuArray(arrayOfStrings)
  arr.sortItems()
  expect([...arr]).toEqual(['a', 'b', 'c'])
  arr = new GokuArray(arrayOfStrings)
  arr.sortItems({ ordering: 'ASC' })
  expect([...arr]).toEqual(['a', 'b', 'c'])
})

test('It should sort the array of strings descending', async () => {
  let arr = new GokuArray(arrayOfStrings)
  arr.sortItems({ ordering: 'DESC' })
  expect([...arr]).toEqual(['c', 'b', 'a'])
})

// Objects
test('It should sort the array of objects ascending by field type of number', async () => {
  let arr = new GokuArray(arrayOfObjects)
  arr.sortItems({ field: 'id' })
  const expected = [{ id: 1 }, { id: 2 }, { id: 3 }]
  expect([...arr.map(i => ({ id: i.id }))]).toEqual([...expected])
  arr = new GokuArray(arrayOfObjects)
  arr.sortItems({ ordering: 'ASC', field: 'id' })
  expect([...arr.map(i => ({ id: i.id }))]).toEqual([...expected])
})

test('It should sort the array of objects descending by field type of number', async () => {
  let arr = new GokuArray(arrayOfObjects)
  arr.sortItems({ ordering: 'DESC', field: 'id' })
  const expected = [{ id: 3 }, { id: 2 }, { id: 1 }]
  expect([...arr.map(i => ({ id: i.id }))]).toEqual([...expected])
})

test('It should sort the array of objects ascending by field type of string', async () => {
  let arr = new GokuArray(arrayOfObjects)
  arr.sortItems({ field: 'text' })
  const expected = [{ text: 'a' }, { text: 'b' }, { text: 'c' }]
  expect([...arr.map(i => ({ text: i.text }))]).toEqual([...expected])
  arr = new GokuArray(arrayOfObjects)
  arr.sortItems({ ordering: 'ASC', field: 'text' })
  expect([...arr.map(i => ({ text: i.text }))]).toEqual([...expected])
})

test('It should sort the array of objects descending by field type of strings', async () => {
  let arr = new GokuArray(arrayOfObjects)
  arr.sortItems({ ordering: 'DESC', field: 'text' })
  const expected = [{ text: 'c' }, { text: 'b' }, { text: 'a' }]
  expect([...arr.map(i => ({ text: i.text }))]).toEqual([...expected])
})
