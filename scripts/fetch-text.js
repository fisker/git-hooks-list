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

async function fetchText(url) {
  const cacheFile = new URL(hash(url), CACHE_DIRECTORY)

  let cached = ''
  try {
    cached = await fs.readFile(cacheFile, 'utf8')
  } catch {}

  if (cached) {
    const [timeString, ...rest] = cached.split('\n\n')
    const time = Number(timeString)
    if (Date.now() - time < CACHE_TIME) {
      return rest.join('\n')
    }
  }

  const response = await fetch(url)
  const text = await response.text()

  await fs.mkdir(CACHE_DIRECTORY, {recursive: true})
  await fs.writeFile(cacheFile, `${Date.now()}\n\n${text}`)

  return text
}

export default fetchText
