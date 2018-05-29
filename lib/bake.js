module.exports = bake;

/**
 * Creates a string value to set a cookie
 * @param {String} name The name of the cookie.
 * @param {String} [value] The value of the cookie. If undefined
 *  and expires/maxAge are undefined, the cookie will be set to expire.
 * @param {Object} [attributes]
 * @param {String} [attributes.domain]
 * @param {String} [attributes.path]
 * @param {Boolean} [attributes.secure]
 * @param {String} [attributes.samesite]
 * @param {Number} [attributes.maxAge]
 * @param {(Date|String)} [attributes.expires]
 * @return {String} cookie value to set
 */
function bake(
  name = '',
  value,
  {
    domain,
    path,
    secure,
    samesite,
    maxAge = value === undefined
      ? 0
      : undefined,
    expires = value === undefined
      /* eslint-disable-next-line no-param-reassign */
      ? (value = '', 0)
      : undefined
  } = {}
) {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  /*
  * RFC6265 mandates a space after each semi-colon.
  * https://tools.ietf.org/html/rfc6265
  */
  if (domain !== undefined) {
    cookie += `; domain=${domain}`;
  }

  if (path !== undefined) {
    cookie += `; path=${path}`;
  }

  if (secure) {
    cookie += '; secure';
  }

  if (samesite !== undefined) {
    cookie += `; samesite=${samesite}`;
  }

  if (expires !== undefined) {
    cookie += `; expires=${new Date(expires).toUTCString()}`;
  }

  if (maxAge !== undefined) {
    cookie += `; max-age=${maxAge}`;
  }

  return cookie;
}
