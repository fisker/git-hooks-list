# git-hooks

> List of Git hooks

Data from [Git - githooks Documentation](https://git-scm.com/docs/githooks)

## Install

```bash
yarn add git-hooks
```

## Usage

```js
const gitHooks = require('git-hooks')

console.log(gitHooks)

// => ['applypatch-msg', 'pre-applypatch', 'post-applypatch', 'pre-commit' ...]
```
