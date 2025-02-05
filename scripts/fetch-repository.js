import fetchText from './fetch-text.js'
// https://github.com/git/git/blob/master/Documentation/githooks.txt
const SOURCE_URLS = [
  'https://raw.githubusercontent.com/git/git/master/Documentation/githooks.txt',
  'https://cdn.jsdelivr.net/gh/git/git/Documentation/githooks.txt',
]

async function fetchData() {
  const text = await Promise.any(SOURCE_URLS.map((url) => fetchText(url)))

  const body = text.split(/HOOKS\n-{5}/).pop()
  // eslint-disable-next-line sonarjs/slow-regex
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
