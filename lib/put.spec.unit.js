const put = require('./put');

describe('[Unit] `put`', () => {
  it('should export a function', () => {
    expect(put).toBeInstanceOf(Function);
  });
});
