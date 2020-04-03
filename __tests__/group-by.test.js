import GokuArray from '../src/index'

const arrayOfPrimitives = [1, 2, 2, 3, 3, 4, 1]
const arrayOfMixed = [1, 2, { id: 'one', text: 'same' }, 3, 3, 4, 1]
const arrayOfObjects = [
  {
    id: 'one',
    text: 'sample #1'
  },
  {
    id: 'one',
    text: 'sample #2'
  },
  {
    id: 'one',
    text: 'sample #3'
  },
  {
    id: 'two',
    text: 'sample #4'
  },
  {
    __id: 'two',
    text: 'sample #4'
  }
]

test('It should return an empty object for an array of primitives', () => {
  const arr = new GokuArray(arrayOfPrimitives)
  const newGroupedArray = arr.groupBy('id')
  expect(newGroupedArray).toStrictEqual({})
})

test('It should return an grouped object for an array of mixed including objects only', () => {
  const arr = new GokuArray(arrayOfMixed)
  const newGroupedArray = arr.groupBy('id')
  expect(newGroupedArray).toStrictEqual({
    "one": [
      {
        "id": "one",
        "text": "same",
      },
    ],
  })
})

test('It should return an empty object for an array of objects grouped by non-existing key', () => {
  const arr = new GokuArray(arrayOfObjects)
  const newGroupedArray = arr.groupBy('_id')
  expect(newGroupedArray).toStrictEqual({})
})

test('It should return an grouped object for an array of objects', () => {
  const arr = new GokuArray(arrayOfObjects)
  const newGroupedArray = arr.groupBy('id')
  expect(newGroupedArray).toStrictEqual({
    "one": [
      {
        "id": "one",
        "text": "same",
        "text": "sample #1",
      }, {
        "id": "one",
        "text": "sample #2",
      },
      {
        "id": "one",
        "text": "sample #3",
      },
    ],
    "two": [
      {
        "id": "two",
        "text": "sample #4",
      },
    ],
  })
})

// test('It should make an array of objects unique passing a function if given the right field to filter', () => {
//   const arr = new GokuArray(arrayOfObjects)
//   let newUniqueArray = arr.unique(({ id }) => id)
//   expect(newUniqueArray).toHaveLength(2)
//   newUniqueArray = arr.unique(({ text }) => text).map(i => i)
//   expect(newUniqueArray).toHaveLength(1)
// })

// test('It should return the original array if the field in the function does not exists', () => {
//   const arr = new GokuArray(arrayOfObjects)
//   const newUniqueArray = arr.unique(({ i }) => i)
//   expect(newUniqueArray).toHaveLength(arrayOfObjects.length)
// })

// test('It should return the original array if no identity function is passed', () => {
//   const arr = new GokuArray(arrayOfObjects, true)
//   const newUniqueArray = arr.unique()
//   expect(newUniqueArray).toHaveLength(arrayOfObjects.length)
// })
