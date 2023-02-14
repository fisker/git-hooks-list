import fetchText from './fetch-text.js'
// https://github.com/git/git/blob/master/Documentation/githooks.txt
const GIT_REPOSITORY_FILE_URL =
  'https://raw.githubusercontent.com/git/git/master/Documentation/githooks.txt'

async function fetchData() {
  const text = await fetchText(GIT_REPOSITORY_FILE_URL)

  const body = text.split(/HOOKS\n-{5}/).pop()
  const regexp = /(?<hook>[\da-z-]+)\n(?<marks>~+)\n/g
  const hooks = []
  for (const {
    groups: {hook, marks},
  } of body.matchAll(regexp)) {
    if (hook.length === marks.length) {
      hooks.push(hook)
    }
  }

  return hooks
}

export default fetchData
