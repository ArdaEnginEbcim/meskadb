const Utils = require('../utils/util');
const fs = require('fs');

class JsonDB {
  constructor(options = {}) {
    this.utils = new Utils(options.seperator);
    this.name = options.name;

    if (!fs.existsSync(`./${this.name}.json`))
      fs.writeFileSync(`./${this.name}.json`, '{}');
  }

  set(key, value) {
    let data = this.all();
    data = this.utils.baseSet(data, key, value);
    fs.writeFileSync(`./${this.name}.json`, JSON.stringify(data, null, 2));

    return this.get(key);
  }

  get(key) {
    return this.utils.baseGet(this.all(), key);
  }

  delete(key) {
    let data = this.all();
    data = this.utils.baseDelete(data, key);

    fs.writeFileSync(`./${this.name}.json`, JSON.stringify(data, null, 2));

    return true;
  }

  all() {
    let data = fs.readFileSync(`./${this.name}.json`, 'utf8');
    return JSON.parse(data);
  }

  deleteAll() {
    fs.writeFileSync(`./${this.name}.json`, '{}');
    return true;
  }
}

module.exports = JsonDB;
