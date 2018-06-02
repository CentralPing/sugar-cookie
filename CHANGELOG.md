#### v0.2.0 (2018-06-02)

##### Chores

* **package:**
  *  use fork of generate-changelog to use npm version ([83412af8](https://github.com/CentralPing/sugar-cookie/commit/83412af8aafcc63c6106aa6f2d40b32cc74cb2cb))
  *  add version to commits ([d4d8fd70](https://github.com/CentralPing/sugar-cookie/commit/d4d8fd700ca83063c164b359926820062c45d4d0))
  *  make script command more concise ([a2b68ee7](https://github.com/CentralPing/sugar-cookie/commit/a2b68ee7a3e43b8284d0d0065506b8018aaff6a5))
  *  update version command for CI build process ([e863ba8a](https://github.com/CentralPing/sugar-cookie/commit/e863ba8a8c42a66881a61a1c6f6fc25465743813))
* **travis:**  move build command to npm script ([bb00b237](https://github.com/CentralPing/sugar-cookie/commit/bb00b237792a83f4534304b9d6da25c77ff94b61))
* **travis, npm:**  setting up config for CI ([f4f8d2ce](https://github.com/CentralPing/sugar-cookie/commit/f4f8d2cef5ca89e7c0f89309dd954deef780b96c))
* **coveralls:**  add correct token ([22640b6d](https://github.com/CentralPing/sugar-cookie/commit/22640b6da60ce3ede106314473a9df5a2d881482))
*  initial commit ([b459130d](https://github.com/CentralPing/sugar-cookie/commit/b459130d1fc2c9faffdeddba3d080595afa21503))

##### Documentation Changes

* **get:**  fix return value documentation ([1994c186](https://github.com/CentralPing/sugar-cookie/commit/1994c1869a1650a184bf8da23d52d54d865afe54))
* **readme:**  add more information on motivation and fix example code ([a6ffcaf2](https://github.com/CentralPing/sugar-cookie/commit/a6ffcaf2f7d4dd6a7741562a778eca10b8fce43a))
* **readme, bake, main:**  correct documentation for current implementation ([69f83c86](https://github.com/CentralPing/sugar-cookie/commit/69f83c8637de58f5738d4a064453fd415ba259c8))

##### New Features

* **get, getAll:**  add support for optional conversion; only split cookie pairs on first "=" ([415a5a43](https://github.com/CentralPing/sugar-cookie/commit/415a5a43ac71c8d2a02d4ca8a2422643cdb78bf5))
* **main:**
  *  allow conversion to be disabled or use custom function ([19cf681f](https://github.com/CentralPing/sugar-cookie/commit/19cf681fa374e5b5bde2597a5faf1f94f924a9d2))
  *  support name pattern matching for getAll ([ed2c1816](https://github.com/CentralPing/sugar-cookie/commit/ed2c181646a6ab1fd3a05ef5b7fa83bc10e8362d))
* **bake:**
  *  make RFC6265 compliant ([16a136b0](https://github.com/CentralPing/sugar-cookie/commit/16a136b06e3cc03382c309d15af9a5ba889d4f7d))
  *  support `samesite` ([d1605585](https://github.com/CentralPing/sugar-cookie/commit/d16055852c5cd344215d0a70b33476541b7b9dc6))

##### Refactors

* ***:**  split module into function files ([ff347bee](https://github.com/CentralPing/sugar-cookie/commit/ff347beec12da628264660b51b20956b039e0591))

##### Tests

* **get, getAll:**  ensure conversion can be optional ([ca79c0ef](https://github.com/CentralPing/sugar-cookie/commit/ca79c0efd99f52d05bac155adebceefeb04bc4cc))
* **main:**
  *  ensure conversion can be disabled or custom ([e9178f2f](https://github.com/CentralPing/sugar-cookie/commit/e9178f2f003d9c152aa96f3ddaa9808c47ff57ce))
  *  ensure getAll supports pattern matching for names ([30723b88](https://github.com/CentralPing/sugar-cookie/commit/30723b880ffccd4ea5caa9dfe8d417c6061e798e))
* **bake:**
  *  ensure cookie is RFC6265 compliant ([ebd41ca6](https://github.com/CentralPing/sugar-cookie/commit/ebd41ca603d88bb34b538c8aaed4ff986bfbeee6))
  *  ensure `samesite` is supported ([6788251e](https://github.com/CentralPing/sugar-cookie/commit/6788251e0c53e8039df0b34322e63e1a464af985))

