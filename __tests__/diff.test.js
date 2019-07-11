import GokuArray from '../src/index'

const arrayOne = [1, 2, 2, 3, 3, 4, 1]
const arrayTwo = [1, 3, 7, 2, 5]

test('It should find the missing item in the second array', () => {
  const arr = new GokuArray(arrayOne)
  const arrDiff = arr.missingFrom(arrayTwo)
  expect(arrDiff).toHaveLength(1)
  expect(arrDiff[0]).toEqual(4)
})

test('It should find the diff in arrays', () => {
  const arr = new GokuArray(arrayOne)
  const objDiff = arr.diff(arrayTwo)
  expect(objDiff.additional).toHaveLength(2)
  expect(objDiff.missing).toHaveLength(1)
  expect(objDiff.common).toHaveLength(3)
  expect(objDiff.additional).toEqual([7, 5])
  expect(objDiff.missing).toEqual([4])
  expect(objDiff.common).toEqual([1, 2, 3])
})
