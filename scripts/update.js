import { outdent } from 'outdent';
import writePrettierFile from 'write-prettier-file';
import fetchData from './fetch-repository.js';
// import fetchData from './fetch-website.js'

const list = await fetchData();

await writePrettierFile(
  new URL('../index.json', import.meta.url),
  JSON.stringify(list, undefined, 2),
);

await writePrettierFile(
  new URL('../index.d.ts', import.meta.url),
  outdent`
    type GitHook = ${list.map((hook) => JSON.stringify(hook)).join('|')};

    /**
    List of Git hooks.

    @example
    \`\`\`
    import gitHooks from 'git-hooks-list'

    console.log(gitHooks)
    //=> ['applypatch-msg', 'pre-applypatch', 'post-applypatch', 'pre-commit', …]
    \`\`\`
    */
    declare const gitHooks: GitHook[];

    export default gitHooks;
  `,
);
