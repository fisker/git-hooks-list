import writePrettierFile from 'write-prettier-file'
import fetchData from './fetch-repository.js'
// import fetchData from './fetch-website.js'

await writePrettierFile(
  new URL('../index.json', import.meta.url),
  JSON.stringify(await fetchData(), undefined, 2),
)
