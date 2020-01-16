import writePrettierFile from 'write-prettier-file'
import path from 'path'
import fetch from './fetch'

const JSON_FILE = path.join(__dirname, '../index.json')

;(async () => {
  const data = await fetch()

  writePrettierFile(JSON_FILE, JSON.stringify(data, null, 2))
})()
