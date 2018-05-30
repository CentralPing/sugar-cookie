const remove = require('./remove');

describe('[Unit] `remove`', () => {
  it('should export a function', () => {
    expect(remove).toBeInstanceOf(Function);
  });
});
