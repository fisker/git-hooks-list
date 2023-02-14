import fs from 'node:fs/promises'

const CACHE_DIRECTORY = new URL('../.cache/', import.meta.url)
const CACHE_TIME = 60 * 60 * 1000 // One hour
const hash = (string) =>
  [...string]
    .reduce(
      (accumulator, character) => accumulator + character.codePointAt(0),
      0,
    )
    .toString(16)
const SEPARATOR = `\n${'-'.repeat(80)}\n\n`

async function fetchText(url) {
  const cacheFile = new URL(hash(url), CACHE_DIRECTORY)

  let cached = ''
  try {
    cached = await fs.readFile(cacheFile, 'utf8')
  } catch {}

  if (cached) {
    const [time, text] = cached.split(SEPARATOR)
    if (Date.now() - Number(time) < CACHE_TIME) {
      return text
    }
  }

  const response = await fetch(url)
  const text = await response.text()

  await fs.mkdir(CACHE_DIRECTORY, {recursive: true})
  await fs.writeFile(cacheFile, [Date.now(), text].join(SEPARATOR))

  return text
}

export default fetchText
