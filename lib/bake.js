module.exports = bake;

/**
 * Creates a string value to set a cookie.
 * @param {String} [name=''] The name of the cookie.
 * @param {String} [value] The value of the cookie. If undefined
 *  and expires/maxAge are undefined, the cookie will be set to expire.
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
 * @return {String} Cookie string value.
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
