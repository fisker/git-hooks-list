import assert from 'node:assert/strict'
import fs from 'node:fs'
import {test} from 'node:test'
import gitHooks from './index.js'
import fetchRepository from './scripts/fetch-repository.js'
import fetchWebsite from './scripts/fetch-website.js'

const SAMPLE_EXTENSION = '.sample'

test('main', () => {
  assert.ok(Array.isArray(gitHooks), 'Git hooks should be an array.')
  assert.ok(gitHooks.length !== 0, 'Git hooks should not be empty.')
  assert.ok(
    gitHooks.length === new Set(gitHooks).size,
    'Git hooks should be unique.',
  )
  assert.ok(
    gitHooks.includes('commit-msg'),
    'Git hooks should has `commit-msg`.',
  )
})

test('.git/hooks', () => {
  const files = fs.readdirSync('.git/hooks')

  const hooksInRepository = new Set([
    ...files.filter((file) => !file.includes('.')),
    ...files
      .filter((file) => file.endsWith(SAMPLE_EXTENSION))
      .map((file) => file.slice(0, -SAMPLE_EXTENSION.length)),
  ])

  const set = new Set(gitHooks)

  assert.ok(hooksInRepository.length !== 0)
  for (const hook of hooksInRepository) {
    assert.ok(set.has(hook), `Git hooks should has ${hook}.`)
  }
})

test('git/git repository', async () => {
  const dataFromRepository = await fetchRepository()

  assert.deepEqual(
    gitHooks,
    dataFromRepository,
    'Git hooks should has be same as data from git/git repository.',
  )
})

test('git-scm.com', async () => {
  const dataFromWebsite = await fetchWebsite()

  assert.ok(gitHooks.length >= dataFromWebsite.length)

  for (const hook of dataFromWebsite) {
    assert.ok(
      gitHooks.includes(hook),
      `Git hooks should has documented ${hook} hook from git-scm.com.`,
    )
  }
})
