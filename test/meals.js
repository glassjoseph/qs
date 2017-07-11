const assert = require('chai').assert
// You can't bundle up unit tests w integration tests, as selenium-webdriver will fail

describe('our integration test bundle', function () {
  it('should exist', function () {
    assert(true)
  })
})
