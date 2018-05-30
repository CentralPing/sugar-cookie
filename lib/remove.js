// ESM syntax is supported.
// export {};

/**
 * @module sugarCookie
*/

const bake = require('./bake');

module.exports = remove;

/**
 * Removes an existing cookie (sets the expiration and max-age attributes
 * to expired values).
 * @example
remove('foo');
remove('bar', {path: '/somePath'});
 * @param {String} [name] The name of the cookie.
 * @param {Object} [attributes] See {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies|Cookies} for more information about attributes.
 * @param {String} [attributes.domain] The domain of the cookie. Defaults to
 *  the host portion of the current document location. If a domain is specified,
 *  subdomains are always included.
 * @param {String} [attributes.path] The absolute path of the cookie. Defaults
 *  to the current path of the current document location.
 */
function remove(name, {domain, path} = {}) {
  document.cookie = bake(name, undefined, {domain, path});
}
