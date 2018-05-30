/* global jsdom */

const {get, getAll, put, remove} = require('./main');

const DOMAIN = 'example.com';

describe('[Func] `main`', () => {
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

  describe('with `get`', () => {
    it('should be a function', () => {
      expect(get).toBeInstanceOf(Function);
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

    it('should return cookie value with a name or regexp match', () => {
      const rootCookie = get('foo');
      expect(rootCookie).toBe('root_path');

      jsdom.reconfigure({url: `http://${DOMAIN}/foo`});
      const fooCookie = get('foo');
      expect(fooCookie).toEqual(['foo_path', 'root_path']);
    });
  });

  describe('with `getAll`', () => {
    it('should be a function', () => {
      expect(getAll).toBeInstanceOf(Function);
    });

    it('should return all cookies for matching paths', () => {
      const rootCookies = getAll();

      expect(rootCookies).toEqual({
        foo: 'root_path',
        far: 123
      });

      jsdom.reconfigure({url: `http://${DOMAIN}/foo/`});
      const fooCookies = getAll();

      expect(fooCookies).toEqual({
        foo: ['foo_path', 'root_path'],
        far: [456, 123]
      });
    });

    it('should return all cookies for matching name or regexp', () => {
      const fooCookies = getAll('foo');

      expect(fooCookies).toEqual({
        foo: 'root_path'
      });

      const farCookies = getAll(/^fa/);

      expect(farCookies).toEqual({
        far: 123
      });
    });
  });

  describe('with `put`', () => {
    it('should be a function', () => {
      expect(put).toBeInstanceOf(Function);
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

    it('should set a cookie to the current path (w/out JSON)', () => {
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

  describe('with `remove`', () => {
    it('should be a function', () => {
      expect(remove).toBeInstanceOf(Function);
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
});
