const getAll = require('./get-all');

describe('[Unit] `getAll`', () => {
  it('should export a function', () => {
    expect(getAll).toBeInstanceOf(Function);
  });
});
