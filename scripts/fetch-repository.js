import fetchText from './fetch-text.js'
// https://github.com/git/git/blob/HEAD/Documentation/githooks.adoc
const SOURCE_URLS = [
  'https://raw.githubusercontent.com/git/git/HEAD/Documentation/githooks.adoc',
  'https://cdn.jsdelivr.net/gh/git/git/Documentation/githooks.adoc',
  'https://gh-proxy.com/github.com/git/git/blob/HEAD/Documentation/githooks.adoc',
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
