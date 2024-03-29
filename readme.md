# git-hooks-list

[![Build Status][github_actions_badge]][github_actions_link]
[![Coverage][coveralls_badge]][coveralls_link]
[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]

[github_actions_badge]: https://img.shields.io/github/actions/workflow/status/fisker/git-hooks-list/continuous-integration.yml?style=flat-square
[github_actions_link]: https://github.com/fisker/git-hooks-list/actions?query=branch%3Amain
[coveralls_badge]: https://img.shields.io/coveralls/github/fisker/git-hooks-list/main?style=flat-square
[coveralls_link]: https://coveralls.io/github/fisker/git-hooks-list?branch=main
[license_badge]: https://img.shields.io/npm/l/git-hooks-list.svg?style=flat-square
[license_link]: https://github.com/fisker/git-hooks-list/blob/main/license
[package_version_badge]: https://img.shields.io/npm/v/git-hooks-list.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/git-hooks-list

> List of Git hooks

Data from [Git - githooks Documentation](https://git-scm.com/docs/githooks)

## Install

```bash
yarn add git-hooks-list
```

## Usage

```js
import gitHooks from 'git-hooks-list'

console.log(gitHooks)

// => ['applypatch-msg', 'pre-applypatch', 'post-applypatch', 'pre-commit', ...]
```
