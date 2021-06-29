import path from 'node:path'
import writePrettierFile from 'write-prettier-file'
import createEsmUtils from 'esm-utils'
import fetch from './fetch-repository.js'

const {dirname} = createEsmUtils(import.meta)
const JSON_FILE = path.join(dirname, '../index.json')

;(async () => {
  const data = await fetch()

  await writePrettierFile(JSON_FILE, JSON.stringify(data, undefined, 2))
})()
