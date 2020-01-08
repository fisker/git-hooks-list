import got from 'got'
import cheerio from 'cheerio'
import writePrettierFile from 'write-prettier-file'
import path from 'path'

const JSON_FILE = path.join(__dirname, '../index.json')
const GIT_DOCUMENTATION_URL = 'https://git-scm.com/docs/githooks'
const cheerioObjectToArray = elements =>
  Array.from(elements).map(element => cheerio(element))

;(async () => {
  const {body: html} = await got(GIT_DOCUMENTATION_URL)

  const sections = cheerioObjectToArray(cheerio.load(html)('.sect1')).reduce(
    (sections, section) => {
      const anchor = section.find('a.anchor')
      const parent = anchor.parent()
      const id = parent.attr('id').replace(/^_/, '')

      if (anchor.attr('href') !== `#_${id}`) {
        return sections
      }

      const body = section.find('.sectionbody')
      sections[id] = cheerio(body)
      return sections
    },
    {}
  )

  const hooks = cheerioObjectToArray(sections.hooks.find('.sect2'))
    .map(section => {
      const anchor = section.find('a.anchor').eq(0)
      const parent = anchor.parent()
      const id = parent.attr('id')

      if (anchor.attr('href') !== `#${id}`) {
        return null
      }

      const hook = parent.text().trim()

      return {
        hook,
        description: cheerioObjectToArray(section.find('.paragraph'))
          .map(paragraph => paragraph.text())
          .join('\n')
          .replace(/\n+/g, '\n')
          .trim(),
      }
    })
    .filter(Boolean)

  writePrettierFile(
    JSON_FILE,
    JSON.stringify(
      hooks.map(({hook}) => hook),
      null,
      2
    )
  )
})()
