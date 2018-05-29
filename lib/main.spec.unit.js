const {get, getAll, put, remove} = require('./main');

describe('[Unit] `main`', () => {
  describe('with `get`', () => {
    it('should be a function', () => {
      expect(get).toBeInstanceOf(Function);
    });
  });

  describe('with `getAll`', () => {
    it('should be a function', () => {
      expect(getAll).toBeInstanceOf(Function);
    });
  });

  describe('with `put`', () => {
    it('should be a function', () => {
      expect(put).toBeInstanceOf(Function);
    });
  });

  describe('with `remove`', () => {
    it('should be a function', () => {
      expect(remove).toBeInstanceOf(Function);
    });
  });
});
