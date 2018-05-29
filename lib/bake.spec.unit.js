const bake = require('./bake');

describe('[Unit] `index`', () => {
  it('should export a function', () => {
    expect(bake).toBeInstanceOf(Function);
  });

  it('should bake expired cookies without a value', () => {
    const anonCookie = bake();

    /* eslint-disable-next-line max-len */
    expect(anonCookie).toBe('=;expires=Thu, 01 Jan 1970 00:00:00 GMT;max-age=0');

    const cookie = bake('foo');

    expect(cookie).toBe('foo=;expires=Thu, 01 Jan 1970 00:00:00 GMT;max-age=0');
  });

  it('should bake a session cookie', () => {
    const cookie = bake('foo', 'bar');

    expect(cookie).toBe('foo=bar');
  });

  it('should bake cookies with options', () => {
    const cookie = bake('foo', 'bar', {
      domain: 'foo.com',
      path: '/foo',
      secure: true,
      expires: '2004-10-27T18:40:00-05:00',
      maxAge: '86'
    });

    /* eslint-disable-next-line max-len */
    expect(cookie).toBe('foo=bar;domain=foo.com;path=/foo;secure;expires=Wed, 27 Oct 2004 23:40:00 GMT;max-age=86');
  });
});
