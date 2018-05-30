// ESM syntax is supported.
// export {};

/**
 * @module sugarCookie
*/

const bake = require('./bake');

module.exports = put;

/**
 * Sets (or updates) a cookie with the provided name domain/path.
 * @example
put('foo', {someObject: 'value'});
put('bar', 'someStringValue', {path: '/somePath'});
 * @param {String} [name] The name of the cookie.
 * @param {*} [value=''] The value of the cookie. By default, all values
 *  are stringified to allow easy conversion back to original types
 *  (as allowed by JSON parsing).
 * @param {Object} [attributes] See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies|Cookies} for more information about attributes.
 * @param {String} [attributes.domain] The domain of the cookie. Defaults to
 *  the host portion of the current document location. If a domain is specified,
 *  subdomains are always included.
 * @param {String} [attributes.path] The absolute path of the cookie. Defaults
 *  to the current path of the current document location.
 * @param {Boolean} [attributes.secure] Indicates whether the cookie is
 *  transmitted over secure protocols such as HTTPS.
 * @param {String} [attributes.samesite] Indicates if a cookie shouldn't be sent
 *  with cross-site requests. See {@link https://www.owasp.org/index.php/SameSite|SameSite} for more information.
 * @param {Number} [attributes.maxAge] The maximum age of a cookie in seconds.
 * @param {(Date|String)} [attributes.expires] The GMT timestamp of the cookie
 *  expiration.
 * @param {Function} [conv=JSON.stringify] Function to convert value.
 */
function put(name, value = '', attributes, conv = JSON.stringify) {
  if (conv) {
    // Attempt to convert value. If it fails, then return the raw value.
    try {
      /* eslint-disable-next-line no-param-reassign */
      value = conv(value);
    } catch (e) {/* ignore error */}
  }

  document.cookie = bake(name, value, attributes);
}
