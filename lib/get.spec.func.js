/* global jsdom */

const get = require('./get');

const DOMAIN = 'example.com';

describe('[Func] `get`', () => {
  beforeEach(() => {
    // Non-async callback
    jsdom.cookieJar.store.removeCookies(DOMAIN, null, (err) => {
      jsdom.reconfigure({url: `http://${DOMAIN}/foo/`});
      document.cookie = 'foo=foo_path';
      document.cookie = 'far=456';
      jsdom.reconfigure({url: `http://${DOMAIN}/`});
      document.cookie = 'foo=root_path';
      document.cookie = 'far=123';
    });
  });

  it('should return undefined with no cookies', () => {
    jsdom.cookieJar.store.removeCookies(DOMAIN, null, (err) => {
      const rootCookie = get('');
      expect(rootCookie).toBeUndefined();
    });
  });

  it('should return undefined without name', () => {
    const rootCookie = get();
    expect(rootCookie).toBeUndefined();

    jsdom.reconfigure({url: `http://${DOMAIN}/foo`});
    const fooCookie = get();
    expect(fooCookie).toBeUndefined();
  });

  it('should return undefined without a name match', () => {
    const rootCookie = get('bar');
    expect(rootCookie).toBeUndefined();

    jsdom.reconfigure({url: `http://${DOMAIN}/foo`});
    const fooCookie = get('bar');
    expect(fooCookie).toBeUndefined();
  });

  it('should return cookie value with a name match', () => {
    const rootCookie = get('foo');
    expect(rootCookie).toEqual(['root_path']);

    jsdom.reconfigure({url: `http://${DOMAIN}/foo`});
    const fooCookie = get('foo');
    expect(fooCookie).toEqual(['foo_path', 'root_path']);
  });

  it('should return cookie value without conversion', () => {
    const farCookieRaw = get('far', null);
    expect(farCookieRaw).toEqual(['123']);
  });
});
