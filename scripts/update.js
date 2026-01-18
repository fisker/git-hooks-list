import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import {inspect} from 'node:util'
import {outdent} from 'outdent'
import writePrettierFile from 'write-prettier-file'
import fetchData from './fetch-repository.js'
// import fetchData from './fetch-website.js'

const gitHooks = await fetchData()

await writePrettierFile(
  new URL('../index.json', import.meta.url),
  JSON.stringify(gitHooks, undefined, 2),
)

const example = outdent`
  \`\`\`js
  import gitHooks from 'git-hooks-list'

  console.log(gitHooks)
  //-> ${inspect(gitHooks, {maxArrayLength: 3})
    .replaceAll('\n', '')
    .replaceAll('  ', '')
    .replaceAll(',', ', ')}
  \`\`\`
`

await writePrettierFile(
  new URL('../index.d.ts', import.meta.url),
  outdent`
    /**
    List of Git hooks.

    @example
    ${example}
    */
    declare const gitHooks: readonly ${JSON.stringify(gitHooks, undefined, 2)};

    export default gitHooks;
  `,
)

{
  const readmeFile = new URL('../readme.md', import.meta.url)
  const original = await fs.readFile(readmeFile, 'utf8')
  const startMark = '<!-- example start -->'
  const endMark = '<!-- example end -->'
  const startMarkIndex = original.indexOf(startMark)
  assert.ok(startMarkIndex !== -1)
  const endMarkIndex = original.indexOf(endMark, startMarkIndex)
  assert.ok(endMarkIndex !== -1)
  const updated = [
    original.slice(0, startMarkIndex + startMark.length),
    example,
    original.slice(endMarkIndex),
  ].join('\n')
  await writePrettierFile(readmeFile, updated)
}
