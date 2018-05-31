// ESM syntax is supported.
// export {};

/**
 * @module sugarCookie
*/

module.exports = getAll;

/**
 * Gets all cookies matching the domain/path of the current page with optinal
 * name pattern matching. Values will be automatically parsed by JSON by
 * default. Cookie values are returned as arrays due to names being
 * non-unique for different hosts/paths.
 * @example
const cookies = getAll();
 * @param {(RegExp|String)} pattern A regexp (or string) to match cookie names.
 *  Strings can be substring matches (e.g. "bar" would match cookie "foobar").
 * @param {Function} [conv=JSON.parse] Function to convert value.
 * @return {Object.<String, Array>} An object where each key is a cookie name.
 */
function getAll(pattern, conv = JSON.parse) {
  return document.cookie.length === 0
    ? {}
    : document.cookie.split(/;\s*/)
      .map(
        (rawCookie) => {
          const [name, ...value] = rawCookie.split('=');

          return [
            decodeURIComponent(name),
            decodeURIComponent(value.join('='))
          ];
        }
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

        if (name in cookies) {
          cookies[name].push(value);
        } else {
          cookies[name] = [value];
        }

        return cookies;
      }, {});
}
