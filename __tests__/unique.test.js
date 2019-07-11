import GokuArray from '../src/index'

const arrayOfPrimitives = [1, 2, 2, 3, 3, 4, 1]
const arrayOfObjects = [
  {
    id: 1,
    text: 'sample'
  },
  {
    id: 1,
    text: 'sample'
  },
  {
    id: 2,
    text: 'sample'
  },
  {
    id: 1,
    text: 'sample'
  }
]

test('It should make an array of primitives unique', () => {
  const arr = new GokuArray(arrayOfPrimitives)
  const newUniqueArray = arr.unique()
  expect(newUniqueArray).toHaveLength(4)
})

test('It should make an array of objects unique passing a function if given the right field to filter', () => {
  const arr = new GokuArray(arrayOfObjects)
  let newUniqueArray = arr.unique(({ id }) => id)
  expect(newUniqueArray).toHaveLength(2)
  newUniqueArray = arr.unique(({ text }) => text).map(i => i)
  expect(newUniqueArray).toHaveLength(1)
})

test('It should return the original array if the field in the function does not exists', () => {
  const arr = new GokuArray(arrayOfObjects)
  const newUniqueArray = arr.unique(({ i }) => i)
  expect(newUniqueArray).toHaveLength(arrayOfObjects.length)
})

test('It should return the original array if no identity function is passed', () => {
  const arr = new GokuArray(arrayOfObjects, true)
  const newUniqueArray = arr.unique()
  expect(newUniqueArray).toHaveLength(arrayOfObjects.length)
})
