/* global jsdom */

const remove = require('./remove');

const DOMAIN = 'example.com';

describe('[Func] `remove`', () => {
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

  it('should remove a cookie from the current path', () => {
    jsdom.cookieJar.store.findCookie(DOMAIN, '/', 'foo', (err, cookie) => {
      /* eslint-disable-next-line new-cap */
      expect(cookie.TTL()).toBe(Infinity);
    });

    remove('foo');

    jsdom.cookieJar.store.findCookie(DOMAIN, '/', 'foo', (err, cookie) => {
      /* eslint-disable-next-line new-cap */
      expect(cookie.TTL()).toBe(0);
    });
  });

  it('should remove a cookie from another path', () => {
    jsdom.cookieJar.store.findCookie(DOMAIN, '/foo', 'foo', (err, cookie) => {
      /* eslint-disable-next-line new-cap */
      expect(cookie.TTL()).toBe(Infinity);
    });

    remove('foo', {path: '/foo'});

    jsdom.cookieJar.store.findCookie(DOMAIN, '/foo', 'foo', (err, cookie) => {
      /* eslint-disable-next-line new-cap */
      expect(cookie.TTL()).toBe(0);
    });
  });
});
