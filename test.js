import fs from 'node:fs'
import {test} from 'node:test'
import fetchRepository from './scripts/fetch-repository.js'
import fetchWebsite from './scripts/fetch-website.js'
import hooks from './index.js'

const SAMPLE_EXTENSION = '.sample'

test('main', ({assert: t}) => {
  t.ok(Array.isArray(hooks), 'Git hooks should be an array.')
  t.ok(hooks.length !== 0, 'Git hooks should not be empty.')
  t.ok(hooks.includes('commit-msg'), 'Git hooks should has `commit-msg`.')
})

test('.git/hooks', ({assert: t}) => {
  const files = fs.readdirSync('.git/hooks')

  const hooksInRepository = new Set([
    ...files.filter((file) => !file.includes('.')),
    ...files
      .filter((file) => file.endsWith(SAMPLE_EXTENSION))
      .map((file) => file.slice(0, -SAMPLE_EXTENSION.length)),
  ])

  const set = new Set(hooks)

  t.ok(hooksInRepository.length !== 0)
  for (const hook of hooksInRepository) {
    t.ok(set.has(hook), `Git hooks should has ${hook}.`)
  }
})

test('git/git repository', async ({assert: t}) => {
  const dataFromRepository = await fetchRepository()

  t.deepEqual(
    hooks,
    dataFromRepository,
    'Git hooks should has be same as data from git/git repository.',
  )
})

test('git-scm.com', async ({assert: t}) => {
  const dataFromWebsite = await fetchWebsite()

  t.ok(hooks.length >= dataFromWebsite.length)

  for (const hook of dataFromWebsite) {
    t.ok(
      hooks.includes(hook),
      `Git hooks should has documented ${hook} hook from git-scm.com.`,
    )
  }
})
