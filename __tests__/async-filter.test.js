import GokuArray from '../src/index'

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve(ms), ms * 1000))
}

const simpleArray = [1, 2, 3]

test('It should return original array using the built-in filter function because filtering condition is not considered', async () => {
  const arr = await simpleArray.filter(async item => {
    const obj = await timeout(item)
    return obj === 1 // this should match only first item, but it does not. Condition is ignored
  })
  expect(arr).toHaveLength(simpleArray.length)
})

test('It should await for the promises to resolve', async () => {
  const arr = new GokuArray(simpleArray)
  const newArr = await arr.asyncFilter(async item => {
    const obj = await timeout(item)
    return obj === item
  })
  expect(newArr.filter(obj => Promise.resolve(obj) == obj)).toHaveLength(0)
  expect(newArr.filter(item => typeof item === 'number')).toHaveLength(
    simpleArray.length
  )
})
