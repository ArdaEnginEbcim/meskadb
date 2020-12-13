const Utils = require('../utils/util');
const fs = require('fs');
let yaml;

class YamlDB {
  constructor(options = {}) {
    this.utils = new Utils(options.seperator);
    this.name = options.name;
    this.strings = options.strings;

    if (!fs.existsSync(`./${this.name}.yaml`))
      fs.writeFileSync(`./${this.name}.yaml`, '');

    try {
      yaml = require('yaml');
    } catch (err) {
      throw new Error(
        `\x1b[31m${this.strings['errors']['yamlNotFound']}\x1b[0m`
      );
    }
  }

  set(key, value) {
    let data = this.all();
    data = this.utils.baseSet(data, key, value);
    fs.writeFileSync(`./${this.name}.yaml`, yaml.stringify(data));

    return this.get(key);
  }

  get(key) {
    const data = this.all();
    return this.utils.baseGet(data, key);
  }

  delete(key) {
    let data = this.all();
    data = this.utils.baseDelete(data, key);
    if (!Object.keys(data).length) data = '';

    fs.writeFileSync(
      `./${this.name}.yaml`,
      data === '' ? '' : yaml.stringify(data)
    );

    return true;
  }

  all() {
    let data = fs.readFileSync(`./${this.name}.yaml`, 'utf-8');
    data = yaml.parse(data) === null ? {} : yaml.parse(data);

    return data;
  }

  deleteAll() {
    fs.writeFileSync(`./${this.name}.yaml`, '');
    return true;
  }
}

module.exports = YamlDB;
