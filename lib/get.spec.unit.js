const get = require('./get');

describe('[Unit] `get`', () => {
  it('should export a function', () => {
    expect(get).toBeInstanceOf(Function);
  });
});
