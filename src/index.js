class GokuArray extends Array {
  constructor(items, preserveNativeMethods) {
    if (items && items.length === 1 && typeof items[0] === 'number') {
      // avoiding new Array(x) that creates an array with a length of x
      super()
      this.push(items[0])
    } else if (items && Array.isArray(items)) {
      super(...items)
    } else {
      super()
    }
    GokuArray.preserveNativeMethods = preserveNativeMethods
    /** Async version of Array.prototype.reduce()
     *  await reduce(['/foo', '/bar', '/baz'], async (acc, v) => {
     *    acc[v] = await (await fetch(v)).json();
     *    return acc;
     *  }, {});
     */
  }

  static _reduce = async (arr, fn, val, pure) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arr.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const v = await fn(val, arr[i], i, arr)
      // eslint-disable-next-line no-param-reassign
      if (pure !== false) val = v
    }
    return val
  }

  // built-in methods will use this as the constructor if preserveNativeMethods flag is present
  static get [Symbol.species]() {
    if (this.preserveNativeMethods) return Array
    return this
  }

  toArray = () => [...this]

  /** Async version of Array.prototype.map()
   *  await map(['foo', 'baz'], async v => await fetch(v) )
   */
  asyncMap = fn =>
    // eslint-disable-next-line no-underscore-dangle
    GokuArray._reduce(
      this,
      async (acc, value, index, arr) => {
        acc.push(await fn(value, index, arr))
      },
      new GokuArray(),
      false
    )

  /** Async version of Array.prototype.filter()
   *  await filter(['foo', 'baz'], async v => (await fetch(v)).ok )
   */
  asyncFilter = async fn =>
    // eslint-disable-next-line no-underscore-dangle
    GokuArray._reduce(
      this,
      async (acc, value, index, arr) => {
        if (await fn(value, index, arr)) acc.push(value)
      },
      new GokuArray(),
      false
    )

  diff = (arr = []) => {
    const current = this
    const next = arr
    const additional = next.filter(item => !current.includes(item))
    const missing = current.filter(item => !next.includes(item))
    const common = current.filter(item => next.includes(item))
    return {
      additional: [...additional], // otherwise will be of type GokuArray
      missing: [...missing], // same as above
      common: [...new Set(common)]
    }
  }

  missingFrom = (arr = []) => {
    const array = this.filter(i => arr.indexOf(i) === -1)
    return new GokuArray(array)
  }

  unique = identity => {
    const uniq =
      typeof identity === 'function'
        ? this.filter(function unq(item) {
            const id =
              typeof identity(item) === 'undefined'
                ? Math.random()
                : identity(item)
            return this.has(id) ? false : (this.add(id), true)
          }, new Set())
        : [...new Set(this)]
    return new GokuArray(uniq)
  }

  sortItems = ({ ordering = 'ASC', field = null } = {}) => {
    const sorted = this.sort((a, b) => {
      if (!field) {
        if (typeof a === 'number') {
          if (ordering === 'ASC') {
            return a - b
          }
          return b - a
        }
        if (typeof a === 'string') {
          if (a < b) {
            const value = ordering === 'ASC' ? -1 : 1
            return value
          }
          if (a > b) {
            const value = ordering === 'ASC' ? 1 : -1
            return value
          }
          // names must be equal
          return 0
        }
        // TODO: sort also date objects
        // use Object.prototype.toString.call(field) === '[object Date]'
        // return field.getTime() - field.getTime()
      } else if (typeof a === 'object') {
        if (typeof a[field] === 'number') {
          if (ordering === 'ASC') {
            return a[field] - b[field]
          }
          return b[field] - a[field]
        }
        if (typeof a[field] === 'string') {
          const nameA = a[field].toUpperCase()
          const nameB = b[field].toUpperCase()
          if (nameA < nameB) {
            const value = ordering === 'ASC' ? -1 : 1
            return value
          }
          if (nameA > nameB) {
            const value = ordering === 'ASC' ? 1 : -1
            return value
          }
          // names must be equal
          return 0
        }
        // TODO: sort also date objects
        // use Object.prototype.toString.call(field) === '[object Date]'
        // return field.getTime() - field.getTime()
      }
      return 0 // do nothing;
    })
    return new GokuArray(sorted)
  }

  groupBy = key =>
    this.reduce((oBKV, obj) => {
      if (typeof obj !== 'object' || obj === null || typeof obj === 'undefined')
        return oBKV
      const objectsByKeyValue = oBKV
      const value = obj[key]
      if (!value) return objectsByKeyValue
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
      return objectsByKeyValue
    }, {})
}

export default GokuArray
