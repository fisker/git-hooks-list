import fetchText from './fetch-text.js'
// https://github.com/git/git/blob/HEAD/Documentation/githooks.adoc
const SOURCE_URLS = [
  'https://raw.githubusercontent.com/git/git/HEAD/Documentation/githooks.adoc',
  // 'https://cdn.jsdelivr.net/gh/git/git/Documentation/githooks.adoc',
  'https://gh-proxy.com/github.com/git/git/blob/HEAD/Documentation/githooks.adoc',
]

const HOOKS_START_MARK = 'HOOKS'

function* getHooks(text) {
  const lines = text.split('\n')

  let foundHooksStartMark = false
  for (let index = 0; index < lines.length - 1; index++) {
    const line = lines[index]
    const nextLine = lines[index + 1]

    if (!foundHooksStartMark) {
      if (
        line === HOOKS_START_MARK &&
        nextLine === '-'.repeat(HOOKS_START_MARK.length)
      ) {
        foundHooksStartMark = true
        // eslint-disable-next-line sonarjs/updated-loop-counter
        index += 1
      }

      continue
    }

    if (/^[\da-z-]+$/u.test(line) && nextLine === '~'.repeat(line.length)) {
      yield line

      // eslint-disable-next-line sonarjs/updated-loop-counter
      index += 1
    }
  }
}

async function fetchData() {
  const text = await Promise.any(SOURCE_URLS.map((url) => fetchText(url)))
  return [...getHooks(text)]
}

export default fetchData
