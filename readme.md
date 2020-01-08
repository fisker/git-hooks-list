# git-hooks-list

> List of Git hooks

Data from [Git - githooks Documentation](https://git-scm.com/docs/githooks)

## Install

```bash
yarn add git-hooks-list

# OR with npm

npm install --save git-hooks-list
```

## Usage

```js
import {gitHooks} from 'git-hooks-list'

console.log(gitHooks)

// => ['applypatch-msg', 'pre-applypatch', 'post-applypatch', 'pre-commit', ...]
```
