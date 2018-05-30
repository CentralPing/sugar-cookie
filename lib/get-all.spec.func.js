/* global jsdom */

const getAll = require('./get-all');

const DOMAIN = 'example.com';

describe('[Func] `getAll`', () => {
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
