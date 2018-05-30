// ESM syntax is supported.
// export {};

/**
 * @module sugarCookie
*/

const getAll = require('./get-all');

module.exports = get;

/**
 * Get the value(s) for a cookie matching the provided name and the
 * domain/path of the current page.
 * If cookies from multiple matching paths match the name then an
 * array of values is returned.
 * Values will be automatically parsed by JSON if possible.
 * @example
const fooCookie = get('foo');
 * @param {String} [name] The name of the cookie.
 * @return {*} A parsed (if applicable) value or array of values.
 */
function get(name) {
  return getAll()[name];
}
