import got from 'got'

// https://github.com/git/git/blob/master/Documentation/githooks.txt
const GIT_REPOSITORY_FILE_URL =
  'https://raw.githubusercontent.com/git/git/master/Documentation/githooks.txt'

async function fetchData() {
  const {body: text} = await got(GIT_REPOSITORY_FILE_URL)

  // TODO: use `String#matchAll`
  const body = text.split(/HOOKS\n-----/).pop()
  const regex = /(?<hook>[\da-z-]+)\n(?<marks>~+)\n/g
  const hooks = []
  let match
  while ((match = regex.exec(body)) !== null) {
    const {hook, marks} = match.groups
    if (hook.length === marks.length) {
      hooks.push(hook)
    }
  }

  return hooks
}

export default fetchData
