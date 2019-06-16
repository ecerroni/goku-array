require("babel-polyfill");
class GokuArray extends Array {
  constructor(items) {
    super(...items);

      /** Async version of Array.prototype.reduce()
   *  await reduce(['/foo', '/bar', '/baz'], async (acc, v) => {
   *    acc[v] = await (await fetch(v)).json();
   *    return acc;
   *  }, {});
   */
    this._reduce = async (arr, fn, val, pure) => {
      for (let i = 0; i < arr.length; i++) {
        const v = await fn(val, arr[i], i, arr);
        if (pure !== false) val = v;
      }
      return val;
    };
  }

  // built-in methods will use this as the constructor
  static get [Symbol.species]() {
    return Array;
  }

  asyncReduce = (fn) =>
    this._reduce(
      this,
      fn,
      [],
      false
    );

  /** Async version of Array.prototype.map()
   *  await map(['foo', 'baz'], async v => await fetch(v) )
   */
  asyncMap = (fn) =>
    this._reduce(
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
  asyncFilter = async (fn) =>
    this._reduce(
      this,
      async (acc, value, index, arr) => {
        if (await fn(value, index, arr)) acc.push(value);
      },
      [],
      false,
    )

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
}

export default GokuArray;
