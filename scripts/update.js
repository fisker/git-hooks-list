import path from 'node:path'
import writePrettierFile from 'write-prettier-file'
import fetch from './fetch-repository.js'

const JSON_FILE = new URL('../index.json', import.meta.url)

;(async () => {
  const data = await fetch()

  await writePrettierFile(JSON_FILE, JSON.stringify(data, undefined, 2))
})()
