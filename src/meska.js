'use strict';

/**
 * @typedef {object} Options Options of the {@link meskaDB} class.
 * @property {string} [name=db] Name of the database file.
 * @property {string} [language=en_US|tr_TR] Language of the error and warnings.
 * @property {string} [adapter=JsonDB|YamlDB] Type of the stored data.
 * @property {string} [seperator=.] Seperator for each data.
 */

/**
 * meskaDB class
 * @class
 */
class meskaDB {
  /**
   * @constructor
   * @param {Options} options
   */
  constructor(options = {}) {
    const Adapter = options.adapter
      ? require(`./adapters/${options.adapter}`)
      : require('./adapters/JsonDB');
    const Utils = require('./utils/util');

    this.name = options.name || 'db';
    this.strings = options.language
      ? require(`./langs/${options.language}`)
      : require('./langs/en_US.json');
    this.adapter = new Adapter({
      name: this.name,
      strings: this.strings,
      seperator: options.seperator || '.'
    });
    this.utils = new Utils();
  }

  /**
   * Sets data in database.
   * @param {string} key
   * @param {any} value
   * @returns {any}
   * @example 
   * db.set('meska.db.test', 'testing');
   * // {"meska": {"db": {"test": "testing"} } }
   * db.set('number', 31);
   * // {"number": 31}
   */
  set(key, value) {
    if (!key || typeof key === 'undefined')
      throw new TypeError(this.strings['errors']['keyBlankOrUndefined']);
    if (!value || typeof value === 'undefined')
      throw new TypeError(this.strings['errors']['valueBlankOrUndefined']);
    if (!this.utils.isValid(value))
      throw new TypeError(this.strings['errors']['valueMustBe']);

    return this.adapter.set(key, value);
  }

  /**
   * Gets data from database.
   * @param {string} key
   * @returns {any}
   * @example 
   * db.get('meska.db');
   * // {"test": "testing"}
   */
  get(key) {
    if (!key || typeof key === 'undefined')
      throw new TypeError(this.strings['errors']['keyBlankOrUndefined']);
    if (!isNaN(key)) key = key.toString();

    return this.adapter.get(key);
  }

  /**
   * Clone of {@link meskaDB#get get} function.
   */
  fetch(key) {
    console.info(
      '\x1b[33m%s\x1b[0m',
      this.strings['warns']['useGetInsteadFetch']
    );
    return this.get(key);
  }

  /**
   * Deletes data from database.
   * @param {string} key
   * @returns {boolean}
   * @example 
   * db.delete('meska.db.test')
   * // true
   */
  delete(key) {
    if (!key || typeof key === 'undefined')
      throw new TypeError(this.strings['errors']['keyBlankOrUndefined']);
    if (!isNaN(key)) key = key.toString();

    return this.adapter.delete(key);
  }

  /**
   * Checks data in database.
   * @param {string} key
   * @returns {boolean}
   * @example 
   * db.has('meska');
   * // true
   */
  has(key) {
    if (!key || typeof key === 'undefined')
      throw new TypeError(this.strings['errors']['keyBlankOrUndefined']);
    if (!isNaN(key)) key = key.toString();

    return !!this.get(key);
  }

  /**
   * Updates data in database.
   * @param {string} key
   * @param {function} fn
   * @example 
   * db.update('number', (x) => x + 38)
   * // {"number": 69 }
   */
  update(key, fn) {
    if (!key || typeof key === 'undefined')
      throw new TypeError(this.strings['errors']['keyBlankOrUndefined']);
    if (!fn || typeof fn === 'undefined')
      throw new TypeError(this.strings['errors']['valueBlankOrUndefined']);
    if (typeof fn !== 'function')
      throw new TypeError(this.strings['errors']['valueMustBeFunc']);

    let data = this.get(key);
    this.set(key, fn(data));
    data = this.get(key);

    return data;
  }

  /**
   * Adds value to data in created database.
   * @param {string} key
   * @param {number} value
   * @returns {number}
   * @example 
   * db.add('number', 30);
   * // 99
   */
  add(key, value) {
    if (!key || typeof key === 'undefined')
      throw new TypeError(this.strings['errors']['keyBlankOrUndefined']);
    if (!value || typeof value === 'undefined')
      throw new TypeError(this.strings['errors']['valueBlankOrUndefined']);
    if (typeof value !== 'number')
      throw new TypeError(this.strings['errors']['valueMustBeNumber']);
    if (!this.has(key)) this.set(key, 0);

    let data = this.get(key);
    this.set(key, data + value);
    data = this.get(key);

    return data;
  }

    /**
   * Substracts value to data in created database.
   * @param {string} key
   * @param {number} value
   * @returns {number}
   * @example 
   * db.substract('number', 19);
   * // 80
   */
   substract(key, value) {
    console.info(
      `\x1b[33m%s\x1b[0m`,
      this.strings['errors']['useAddInsteadSubs']
    );

    this.add(key, -value);
  }

  /**
   * Clone of {@link meskaDB#substract substract} function.
   * @param {string} key
   * @param {number} value
   * @returns {number}
   * @example 
   * db.substr('number', 10);
   * // 70
   */
  substr(key, value) {
    return this.substract(key, value);
  }

  /**
   * Returns all data in database.
   * @returns {object}
   * @example 
   * db.all();
   * // {"meska": {"db": {"test": "testing"} }, "number": 70}
   */
  all() {
    return this.adapter.all();
  }

  /**
   * Deletes all data from database.
   * @returns {boolean}
   * @example 
   * db.deleteAll();
   * // true
   */
  deleteAll() {
    return this.adapter.deleteAll();
  }
}

module.exports = meskaDB;
