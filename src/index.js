require("babel-polyfill");
class GokuArray extends Array {
  constructor(items) {
    super(...items);
    this.reduce = async (arr, fn, val, pure) => {
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

  asyncMap = async (arr, fn) =>
    await this.reduce(
      arr,
      async (acc, value, index, arr) => {
        acc.push(await fn(value, index, arr));
      },
      [],
      false
    );

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
