import assert from 'node:assert/strict'
import fs from 'node:fs'
import {test} from 'node:test'
import hooks from './index.js'
import fetchRepository from './scripts/fetch-repository.js'
import fetchWebsite from './scripts/fetch-website.js'

const SAMPLE_EXTENSION = '.sample'

test('main', () => {
  assert.ok(Array.isArray(hooks), 'Git hooks should be an array.')
  assert.ok(hooks.length !== 0, 'Git hooks should not be empty.')
  assert.ok(hooks.length === new Set(hooks).size, 'Git hooks should be unique.')
  assert.ok(hooks.includes('commit-msg'), 'Git hooks should has `commit-msg`.')
})

test('.git/hooks', () => {
  const files = fs.readdirSync('.git/hooks')

  const hooksInRepository = new Set([
    ...files.filter((file) => !file.includes('.')),
    ...files
      .filter((file) => file.endsWith(SAMPLE_EXTENSION))
      .map((file) => file.slice(0, -SAMPLE_EXTENSION.length)),
  ])

  const set = new Set(hooks)

  assert.ok(hooksInRepository.length !== 0)
  for (const hook of hooksInRepository) {
    assert.ok(set.has(hook), `Git hooks should has ${hook}.`)
  }
})

test('git/git repository', async () => {
  const dataFromRepository = await fetchRepository()

  assert.deepEqual(
    hooks,
    dataFromRepository,
    'Git hooks should has be same as data from git/git repository.',
  )
})

test('git-scm.com', async () => {
  const dataFromWebsite = await fetchWebsite()

  assert.ok(hooks.length >= dataFromWebsite.length)

  for (const hook of dataFromWebsite) {
    assert.ok(
      hooks.includes(hook),
      `Git hooks should has documented ${hook} hook from git-scm.com.`,
    )
  }
})
