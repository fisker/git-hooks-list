const assert = require('assert')
const fs = require('fs')
const path = require('path')
const hooks = require('.')

assert.strict.ok(Array.isArray(hooks), 'Git hooks should be an array.')
assert.strict.ok(hooks.length > 0, 'Git hooks should not be empty.')

const hooksInRepository = [
  ...new Set(
    fs.readdirSync('.git/hooks').map(file => path.basename(file, '.sample'))
  ),
]

const set = new Set(hooks)
for (const hook of hooksInRepository) {
  assert.strict.ok(set.has(hook), `Git hooks should has ${hook}`)
}
