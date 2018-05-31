/* global jsdom */

const getAll = require('./get-all');

const DOMAIN = 'example.com';

describe('[Func] `getAll`', () => {
  beforeEach(() => {
    // Non-async callback
    jsdom.cookieJar.store.removeCookies(DOMAIN, null, (err) => {
      jsdom.reconfigure({url: `http://${DOMAIN}/foo/`});
      document.cookie = 'foo=path%3Dfoo';
      document.cookie = 'far=456';
      document.cookie = 'for=%5B%22path%3Dfoo%22%5D';

      jsdom.reconfigure({url: `http://${DOMAIN}/`});
      document.cookie = 'foo=root_path';
      document.cookie = 'far=123';
      document.cookie = 'for=%5B%22root_path%22%5D';
    });
  });

  it('should return an empty object with no cookies', () => {
    jsdom.cookieJar.store.removeCookies(DOMAIN, null, (err) => {
      const rootCookies = getAll();
      expect(rootCookies).toEqual({});
    });
  });

  it('should return all cookies for matching paths', () => {
    const rootCookies = getAll();

    expect(rootCookies).toEqual({
      foo: ['root_path'],
      far: [123],
      for: [['root_path']]
    });

    jsdom.reconfigure({url: `http://${DOMAIN}/foo/`});
    const fooCookies = getAll();

    expect(fooCookies).toEqual({
      foo: ['path=foo', 'root_path'],
      far: [456, 123],
      for: [['path=foo'], ['root_path']]
    });
  });

  it('should return cookies for matching name or regexp', () => {
    const fooCookies = getAll('foo');

    expect(fooCookies).toEqual({
      foo: ['root_path']
    });

    const farCookies = getAll(/^fa/);

    expect(farCookies).toEqual({
      far: [123]
    });
  });

  it('should return all cookies without conversion', () => {
    const rootCookies = getAll(undefined, null);

    expect(rootCookies).toEqual({
      foo: ['root_path'],
      far: ['123'],
      for: ['["root_path"]']
    });
  });
});
