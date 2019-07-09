import GokuArray from '../src/index';

const arrayOfPrimitives = [1, 2, 2, 3, 3, 4, 1];

test('It should return native array when using native array built-in methods', () => {
  const arr = new GokuArray(arrayOfPrimitives, true);
  let newArray = arr.map(i => i)
  expect(newArray).toEqual(arrayOfPrimitives)
  const error = () => newArray.unique()
  expect(error).toThrow('b.unique is not a function')
});

test('It should alway return goku array even using array built in methods', () => {
  const arr = new GokuArray(arrayOfPrimitives);
  let newArray = arr.map(i => i)
  expect(newArray.toArray()).toEqual(arrayOfPrimitives)
  const error = () => newArray.unique()
  expect(error).not.toThrow()
});
