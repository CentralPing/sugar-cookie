// ESM syntax is supported.
// export {};

/**
 * @module sugarCookie
*/

module.exports = getAll;

/**
 * Gets all cookies matching the domain/path of the current page.
 * If cookies from multiple matching paths match the name then an
 * array of values is returned.
 * Values will be automatically parsed by JSON if possible.
 * @example
const cookies = getAll();
 * @param {(RegExp|String)} pattern A regexp (or string) to match cookie names.
 *  Strings can be substring matches (e.g. "bar" would match cookie "foobar").
 * @param {Function} [conv=JSON.parse] Function to convert value.
 * @return {Object} An object where each key is a cookie name.
 */
function getAll(pattern, conv = JSON.parse) {
  return {...(
    document.cookie.split(/;\s*/)
      .map(
        (rawCookie) => rawCookie.split('=').map(decodeURIComponent)
      )
      .filter(
        ([name]) => pattern !== undefined
          ? name.match(pattern)
          : true
      )
      .reduce((cookies, [name, value]) => {
        if (conv) {
          // Attempt to convert value. If it fails, then return the raw value.
          try {
            /* eslint-disable-next-line no-param-reassign */
            value = conv(value);
          } catch (e) {/* ignore error */}
        }

        cookies[name] = name in cookies
          ? [].concat(cookies[name], value)
          : value;

        return cookies;
      }, {})
  )};
}
