/* global jsdom */

const put = require('./put');

const DOMAIN = 'example.com';

describe('[Func] `put`', () => {
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

  it('should set a cookie to the current path', () => {
    put('bar', 'root');

    jsdom.cookieJar.store.findCookie(DOMAIN, '/', 'bar', (err, cookie) => {
      expect(cookie).toMatchObject({
        key: 'bar',
        value: '%22root%22',
        domain: DOMAIN,
        path: '/'
      });
    });
  });

  it('should set a cookie to the current path w/ custom conversion', () => {
    put('bar', 'root', undefined, (v) => v.toUpperCase());

    jsdom.cookieJar.store.findCookie(DOMAIN, '/', 'bar', (err, cookie) => {
      expect(cookie).toMatchObject({
        key: 'bar',
        value: 'ROOT',
        domain: DOMAIN,
        path: '/'
      });
    });
  });

  it('should set a cookie to the current path w/out conversion', () => {
    put('bar', 'root', undefined, false);

    jsdom.cookieJar.store.findCookie(DOMAIN, '/', 'bar', (err, cookie) => {
      expect(cookie).toMatchObject({
        key: 'bar',
        value: 'root',
        domain: DOMAIN,
        path: '/'
      });
    });
  });

  it('should set a cookie to a different path', () => {
    put('bar', 'root', {path: '/foo'});

    jsdom.cookieJar.store.findCookie(DOMAIN, '/foo', 'bar', (err, cookie) => {
      expect(cookie).toMatchObject({
        key: 'bar',
        value: '%22root%22',
        domain: DOMAIN,
        path: '/foo'
      });
    });
  });
});
