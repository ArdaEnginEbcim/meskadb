const { isObject } = require('util');

class Util {
  constructor(seperator) {
    this.seperator = seperator;
  }

  baseSet(data, path, value) {
    if (path.includes(this.seperator)) {
      const elements = path.split(this.seperator);
      const key = elements.pop();
      const obj = elements.reduce((x, y) => {
        if (typeof x[y] === 'undefined' || !isObject(x[y])) x[y] = {};
        return x[y];
      }, data);

      obj[key] = value;
      return data;
    } else {
      data[path] = value;
      return data;
    }
  }

  baseGet(data, path) {
    if (path.includes(this.seperator)) {
      const elements = path.split(this.seperator);
      const key = elements.pop();
      const obj = elements.reduce((x, y) => {
        if (typeof x[y] === 'undefined') x[y] = {};
        return x[y];
      }, data);
      return obj[key];
    } else {
      return data[path];
    }
  }

  baseDelete(data, path) {
    if (path.includes(this.seperator)) {
      const elements = path.split(this.seperator);
      const key = elements.pop();
      const obj = elements.reduce((x, y) => {
        if (typeof x[y] === 'undefined') x[y] = {};
        return x[y];
      }, data);
      delete obj[key];
      return data;
    } else {
      delete data[path];
      return data;
    }
  }

  isValid(input) {
    return (
      ['string', 'number', 'boolean', 'undefined'].includes(typeof input) ||
      isObject(input) ||
      Array.isArray(input)
    );
  }
}

module.exports = Util;
