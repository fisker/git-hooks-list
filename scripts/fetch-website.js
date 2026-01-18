import * as cheerio from 'cheerio'
import fetchText from './fetch-text.js'

const GIT_DOCUMENTATION_URL = 'https://git-scm.com/docs/githooks'
const cheerioObjectToArray = (elements, $) =>
  // eslint-disable-next-line unicorn/prefer-spread
  Array.from(elements).map((element) => $(element))

async function fetchData() {
  const html = await fetchText(GIT_DOCUMENTATION_URL)

  const $ = cheerio.load(html)

  const sections = Object.fromEntries(
    cheerioObjectToArray($('.sect1'), $)
      .map((section) => {
        const anchor = section.find('a.anchor')
        const parent = anchor.parent()
        const id = parent.attr('id').replace(/^_/, '')

        if (anchor.attr('href') !== `#_${id}`) {
          return
        }

        const body = section.find('.sectionbody')
        return [id, $(body)]
      })
      .filter(Boolean),
  )

  const hooks = cheerioObjectToArray(sections.hooks.find('.sect2'), $)
    .map((section) => {
      const anchor = section.find('a.anchor').eq(0)
      const parent = anchor.parent()
      const id = parent.attr('id')

      if (anchor.attr('href') !== `#${id}`) {
        return
      }

      const hook = parent.text().trim()

      return {
        hook,
        description: cheerioObjectToArray(section.find('.paragraph'), $)
          .map((paragraph) => paragraph.text())
          .join('\n')
          .replaceAll(/\n+/g, '\n')
          .trim(),
      }
    })
    .filter(Boolean)

  return hooks.map(({hook}) => hook)
}

export default fetchData
