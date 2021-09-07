import fs from 'node:fs'
import test from 'ava'
import fetchRepository from './scripts/fetch-repository.js'
import fetchWebsite from './scripts/fetch-website.js'

const SAMPLE_EXTENSION = '.sample'
const hooks = JSON.parse(fs.readFileSync('./index.json'))

test('main', (t) => {
  t.true(Array.isArray(hooks), 'Git hooks should be an array.')
  t.true(hooks.length !== 0, 'Git hooks should not be empty.')
  t.true(hooks.includes('commit-msg'), 'Git hooks should has `commit-msg`.')
})

test('.git/hooks', (t) => {
  const files = fs.readdirSync('.git/hooks')

  const hooksInRepository = new Set([
    ...files.filter((file) => !file.includes('.')),
    ...files
      .filter((file) => file.endsWith(SAMPLE_EXTENSION))
      .map((file) => file.slice(0, -SAMPLE_EXTENSION.length)),
  ])

  const set = new Set(hooks)

  t.true(hooksInRepository.length !== 0)
  for (const hook of hooksInRepository) {
    t.true(set.has(hook), `Git hooks should has ${hook}.`)
  }
})

test('git/git repository', async (t) => {
  const dataFromRepository = await fetchRepository()

  t.deepEqual(
    hooks,
    dataFromRepository,
    'Git hooks should has be same as data from git/git repository.',
  )
})

test('git-scm.com', async (t) => {
  const dataFromWebsite = await fetchWebsite()

  t.true(hooks.length >= dataFromWebsite.length)

  for (const hook of dataFromWebsite) {
    t.true(
      hooks.includes(hook),
      `Git hooks should has documented ${hook} hook from git-scm.com.`,
    )
  }
})
