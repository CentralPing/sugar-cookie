// ESM syntax is supported.
// export {};

/**
 * @module sugarCookie
*/

const getAll = require('./get-all');

module.exports = get;

/**
 * Get the value(s) for a cookie matching the provided name and the
 * domain/path of the current page. Values will be automatically parsed
 * by JSON by default. Cookie values are returned as arrays due to names
 * being non-unique for different hosts/paths.
 * @example
const fooCookie = get('foo');
 * @param {String} [name] The name of the cookie.
 * @param {Function} [conv=JSON.parse] Function to convert value.
 * @return {*} A parsed (if applicable) value or array of values.
 */
function get(name, conv) {
  return getAll(undefined, conv)[name];
}
