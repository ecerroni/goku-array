[![Build Status](https://img.shields.io/travis/ecerroni/goku-array/master.svg?style=flat-square)](https://travis-ci.org/ecerroni/goku-array) [![Coverage Status](https://img.shields.io/codecov/c/github/ecerroni/goku-array/master.svg?style=flat-square)](https://codecov.io/gh/ecerroni/goku-array/branch/master)[![npm version](https://badge.fury.io/js/goku-array.svg)](https://www.npmjs.com/package/goku-array)

# Goku Array

Utility class that extends Array, works with node 10

## Install
```
npm i goku-array
```

OR

```
yarn add goku-array
```

## Utilities

### unique()

```
import GokuArray from 'goku-array';

const arrayOfPrimitives = [1, 2, 2, 3, 3, 4, 1];
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
  },
];

  // make an array of primitives unique

  const arr = new GokuArray(arrayOfPrimitives);
  const newUniqueArray = arr.unique() // [1, 2, 3, 4]

 // make an array of objects unique passing a function if given the right field to filter
  const arr = new GokuArray(arrayOfObjects);
  let newUniqueArray = arr.unique(({ id }) => id) // [{ id: 1, text: 'sample' }, { id: 2, text: 'sample' }]

  newUniqueArray = arr.unique(({ text }) => text) // [{ id: 1, text: 'sample' }]
```

### diff()
```
const arrayOne = [1, 2, 2, 3, 3, 4, 1];
const arrayTwo = [1, 3, 7, 2, 5];

// find the difference in 2 arrays
// result is an object

  const arr = new GokuArray(arrayOne);
  const objDiff = arr.diff(arrayTwo)
  
  console.log(objDiff)
  
// {
//   additional: [7, 5],
//   missing: [4],
//   common: [1, 2, 3]
// }
```

### missingFrom()

```
const arrayOne = [1, 2, 2, 3, 3, 4, 1];
const arrayTwo = [1, 3, 7, 2, 5];

// find the missing item in the second array
  const arr = new GokuArray(arrayOne);
  const arrDiff = arr.missingFrom(arrayTwo)
  console.log(arrDiff)
  // [4]
```

### asyncMap()

```
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve(true), ms * 1000));
}

const simpleArray = [1, 2, 3]

// await for the promises to resolve'

  const arr = new GokuArray(simpleArray)
  const newArr = await arr.asyncMap(item => timeout(item))
  console.log(newArray)
  // [true, true, true]
```

### asycnFilter()

```
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve(ms), ms * 1000))
}

const simpleArray = [1, 2, 3]

// await for the promises to resolve
  const arr = new GokuArray(simpleArray)
  const newArr = await arr.asyncFilter(async item => {
    const obj = await timeout(item)
    return obj === item
  })
  console.log(newArr)
  // [1, 2, 3]
```

### groupBy(key)

```
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

let arr = new GokuArray(arrayOfMixed)
let newGroupedArray = arr.groupBy('id')
  // newGroupedArray equals to {
  //   "one": [
  //     {
  //       "id": "one",
  //       "text": "same",
  //     },
  //   ],
  // })

  arr = new GokuArray(arrayOfObjects)
  newGroupedArray = arr.groupBy('id')
  // newGroupedArray equals to {
  //   "one": [
  //     {
  //       "id": "one",
  //       "text": "same",
  //       "text": "sample #1",
  //     }, {
  //       "id": "one",
  //       "text": "sample #2",
  //     },
  //     {
  //       "id": "one",
  //       "text": "sample #3",
  //     },
  //   ],
  //   "two": [
  //     {
  //       "id": "two",
  //       "text": "sample #4",
  //     },
  //   ],
  // }
```

### sortItems()

You may sort numbers, strings and objects

```
const arrayOfNumbers = [2, 1, 3]
const arrayOfStrings = ['a', 'c', 'b']
const arrayOfObjects = [{ id: 1, text: 'a' }, { id: 3, text: 'c' }, { id: 2, text: 'b' }]

// Numbers
// array of numbers ascending
let arr = new GokuArray(arrayOfNumbers)
arr.sortItems()
// [1, 2, 3]

arr = new GokuArray(arrayOfNumbers)
arr.sortItems({ ordering: 'ASC' })
// [1, 2, 3]


// array of numbers descending'
let arr = new GokuArray(arrayOfNumbers)
arr.sortItems({ ordering: 'DESC' })
// [3, 2, 1]


// Strings
// array of strings ascending
let arr = new GokuArray(arrayOfStrings)
arr.sortItems()
// ['a', 'b', 'c']

arr = new GokuArray(arrayOfStrings)
arr.sortItems({ ordering: 'ASC' })
// ['a', 'b', 'c']


// array of strings descending
let arr = new GokuArray(arrayOfStrings)
arr.sortItems({ ordering: 'DESC' })
// ['c', 'b', 'a']

// Objects
// array of objects ascending by field type of number
let arr = new GokuArray(arrayOfObjects)
arr.sortItems({ field: 'id' })
// [{ id: 1 }, { id: 2 }, { id: 3 }]

arr = new GokuArray(arrayOfObjects)
arr.sortItems({ ordering: 'ASC', field: 'id' })
// [{ id: 1 }, { id: 2 }, { id: 3 }]

// array of objects descending by field type of number
let arr = new GokuArray(arrayOfObjects)
arr.sortItems({ ordering: 'DESC', field: 'id' })
// [{ id: 3 }, { id: 2 }, { id: 1 }]


// array of objects ascending by field type of string
let arr = new GokuArray(arrayOfObjects)
arr.sortItems({ field: 'text' })
// [{ text: 'a' }, { text: 'b' }, { text: 'c' }]

arr = new GokuArray(arrayOfObjects)
arr.sortItems({ ordering: 'ASC', field: 'text' })
// [{ text: 'a' }, { text: 'b' }, { text: 'c' }]

// array of objects descending by field type of strings
let arr = new GokuArray(arrayOfObjects)
arr.sortItems({ ordering: 'DESC', field: 'text' })
// [{ text: 'c' }, { text: 'b' }, { text: 'a' }]
```

### toArray()

```
const array = [1, 2, 2, 3, 3, 4, 1];

// return plain array
const arr = new GokuArray(array);
arr.toArray() // will return native Array and pass deep equality check for Array
```

#### Inheritance
GokuArray inherits all Array built-in methods
```
const arrayOfPrimitives = [1, 2, 2, 3, 3, 4, 1];

const gokuArr = new GokuArray(arrayOfPrimitives);
console.log(Array.isArray(gokuArr)) // true


const arr = new GokuArray(arrayOfPrimitives);
const newArr = arr.filter(item => item === 1)
console.log(newArray) // [1, 1]
```

### Chain methods

```
const array = [1, 2, 2, 3, 3, 4, 1];

// chain own methods
const arr = new GokuArray(array);
const uniqueSortedPlainArray = arr.unique().sortItems().toArray() // works

// chain onwn methods and array build-in methods
const arr = new GokuArray(array);
const uniqueSortedPlainArray = arr.unique().map(i => i).filter(i => !!i).sortItems().sort().toArray().sort() // works
```

### Preserve built in methods

### Default
```
const arr = new GokuArray(array);
// .map(), .filter(), .sort(), etc. => GokuArray
// .asyncMap(), .asyncFilter, .unique(), .missingFrom() => GokuArray
// .diff() => Object
// .toArray() => Array
arr.unique().map(i => i).sortItems() // works
arr.unique().map(i => i) // works
arr.unique().toArray().map(i => i) // works
arr.unique().toArray().unique(i => i) // does not work
```

#### Preserving built-in methods
```
const arr = new GokuArray(array, true);
// .map(), .filter(), .sort(), etc. => Array
// .asyncMap(), .asyncFilter, .unique(), .missingFrom() => GokuArray
// .diff() => Object
// .toArray() => Array
arr.unique().map(i => i).sortItems() // does not work
arr.unique().map(i => i) // works
arr.unique().toArray().map(i => i) // works
arr.unique().toArray().unique(i => i) // does not work
```
## Thanks To
- [developit/async-examples.js](https://gist.github.com/developit/7a6e48654b88002a835f8f6bc4535a6d)
- [Andrea Giammarchi - Medium post's comment](https://medium.com/@WebReflection/this-looks-like-a-good-candidate-for-the-next-version-of-ecmascript-3199558d4e78)