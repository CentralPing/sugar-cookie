// ESM syntax is supported.
// export {};

/**
 * @module sugarCookie
*/

const bake = require('./bake');

exports.get = get;
exports.getAll = getAll;
exports.put = put;
exports.remove = remove;

/**
 * Get the value(s) for a cookie matching the provided name and the
 * domain/path of the current page.
 * If cookies from multiple matching paths match the name then an
 * array of values is returned.
 * @example
const fooCookie = get('foo');
 * @param {String} name The name of the cookie.
 * @return {String|String[]}
 */
function get(name) {
  return getAll()[name];
}

/**
 * Gets all cookies matching the domain/path of the current page.
 * Values will be automatically parsed by JSON if possible.
 * @example
const cookies = getAll();
 * @return {Object}
 */
function getAll() {
  return {...(
    document.cookie.split(/;\s*/)
      .map(
        (rawCookie) => rawCookie.split('=').map(decodeURIComponent)
      )
      .reduce((cookies, [name, value]) => {
        // Attempt to parse value. If it fails, then return the raw value.
        try {
          /* eslint-disable-next-line no-param-reassign */
          value = JSON.parse(value);
        } catch (e) {/* ignore error */}

        cookies[name] = name in cookies
          ? [].concat(cookies[name], value)
          : value;

        return cookies;
      }, {})
  )};
}

/**
 * Sets (or updates) a cookie with the provided name domain/path.
 * By default, all values are stringified to allow easy conversion back
 * to original types (as allowed by JSON parsing).
 * @example
put('foo', {someObject: 'value'});
put('bar', 'someStringValue', {path: '/somePath'});
 * @param {String} name The name of the cookie.
 * @param {*} value The value of the cookie.
 * @param {Object} attributes
 * @param {Boolean} [toJSON=true] Enable or disable stringification of value.
 */
function put(name, value = '', attributes, toJSON = true) {
  if (toJSON) {
    /* eslint-disable-next-line no-param-reassign */
    value = JSON.stringify(value);
  }

  document.cookie = bake(name, value, attributes);
}

/**
 * Removes an existing cookie (sets the expiration and max-age attributes
 * to expired values).
 * @example
remove('foo');
remove('bar', {path: '/somePath'});
 * @param {String} name The name of the cookie.
 * @param {Object} attributes
 */
function remove(name, attributes) {
  document.cookie = bake(name, undefined, attributes);
}
