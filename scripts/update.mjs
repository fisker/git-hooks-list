import writePrettierFile from 'write-prettier-file'
import path from 'path'
import url from 'url'
import fetch from './fetch-repository.mjs'

const dirname = path.dirname(url.fileURLToPath(import.meta.url))

const JSON_FILE = path.join(dirname, '../index.json')

;(async () => {
  const data = await fetch()

  writePrettierFile(JSON_FILE, JSON.stringify(data, undefined, 2))
})()
