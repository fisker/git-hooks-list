import test from 'ava'
import fs from 'fs'
import hooks from './index.json'
import fetch from './scripts/fetch'

test('main', t => {
  t.true(Array.isArray(hooks), 'Git hooks should be an array.')
  t.true(hooks.length > 0, 'Git hooks should not be empty.')
  t.true(hooks.includes('commit-msg'), `Git hooks should has \`commit-msg\`.`)
})

test('.git/hooks', t => {
  const hooksInRepository = [
    ...new Set(
      fs.readdirSync('.git/hooks').filter(file => !file.includes('.'))
    ),
  ]
  const set = new Set(hooks)

  for (const hook of hooksInRepository) {
    t.true(set.has(hook), `Git hooks should has ${hook}.`)
  }
})

test('git-scm.com', async t => {
  const data = await fetch()

  t.deepEqual(
    hooks,
    data,
    `Git hooks should has be same as data from git-scm.com .`
  )
})
