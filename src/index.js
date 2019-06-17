class GokuArray extends Array {
  constructor(items) {
    super(...items);
    /** Async version of Array.prototype.reduce()
     *  await reduce(['/foo', '/bar', '/baz'], async (acc, v) => {
     *    acc[v] = await (await fetch(v)).json();
     *    return acc;
     *  }, {});
     */
  }

  static _reduce = async (arr, fn, val, pure) => {
    for (let i = 0; i < arr.length; i++) {
      const v = await fn(val, arr[i], i, arr);
      if (pure !== false) val = v;
    }
    return val;
  };

  // built-in methods will use this as the constructor
  static get [Symbol.species]() {
    return Array;
  }

  /** Async version of Array.prototype.map()
   *  await map(['foo', 'baz'], async v => await fetch(v) )
   */
  asyncMap = fn =>
    GokuArray._reduce(
      this,
      async (acc, value, index, arr) => {
        acc.push(await fn(value, index, arr));
      },
      [],
      false
    );

  /** Async version of Array.prototype.filter()
   *  await filter(['foo', 'baz'], async v => (await fetch(v)).ok )
   */
  asyncFilter = async fn =>
    GokuArray._reduce(
      this,
      async (acc, value, index, arr) => {
        if (await fn(value, index, arr)) acc.push(value);
      },
      [],
      false
    );

  diff = (arr = []) => {
    const current = this;
    const next = arr;
    const additional = next.filter(item => !current.includes(item));
    const missing = current.filter(item => !next.includes(item));
    const common = current.filter(item => next.includes(item));
    return {
      additional,
      missing,
      common: [...new Set(common)]
    };
  };

  missingFrom = (arr = []) => this.filter(i => arr.indexOf(i) === -1);

  unique = identity => {
    return typeof identity === "function"
      ? this.filter(function(item) {
          const id =
            typeof identity(item) === "undefined"
              ? Math.random()
              : identity(item);
          return this.has(id) ? false : (this.add(id), true);
        }, new Set())
      : [...new Set(this)];
  };

  sortItems = ({ ordering = "ASC", field = null } = {}) =>
    this.sort((a, b) => {
      if (!field) {
        if (typeof a === "number") {
          if (ordering === "ASC") {
            return a - b;
          }
          return b - a;
        }
        if (typeof a === "string") {
          if (a < b) {
            const value = ordering === "ASC" ? -1 : 1;
            return value;
          }
          if (a > b) {
            const value = ordering === "ASC" ? 1 : -1;
            return value;
          }
          // names must be equal
          return 0;
        }
        // TODO: sort also date objects
        // use Object.prototype.toString.call(field) === '[object Date]'
        // return field.getTime() - field.getTime()
      } else if (typeof a === "object") {
        if (typeof a[field] === "number") {
          if (ordering === "ASC") {
            return a[field] - b[field];
          }
          return b[field] - a[field];
        }
        if (typeof a[field] === "string") {
          const nameA = a[field].toUpperCase();
          const nameB = b[field].toUpperCase();
          if (nameA < nameB) {
            const value = ordering === "ASC" ? -1 : 1;
            return value;
          }
          if (nameA > nameB) {
            const value = ordering === "ASC" ? 1 : -1;
            return value;
          }
          // names must be equal
          return 0;
        }
        // TODO: sort also date objects
        // use Object.prototype.toString.call(field) === '[object Date]'
        // return field.getTime() - field.getTime()
      }
      return 0; // do nothing;
    });
}

export default GokuArray;
