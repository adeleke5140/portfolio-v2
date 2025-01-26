---
title: 'Conventional Commits: an exploration'
date: '2023-03-19'
status: 'draft'
---

## Introduction

I recently came across conventional commits.

It's a way of writing commit messages that align with Semantic versioning spec.
The semantic versioning spec outlines how to properly document changes to public api by using the appropriate version numbers.
This ensures that users of your API have an understanding of the changes you make. It makes it predictable.

A summary of the spec, which can be found on the [https://semver.org/](website) state:
Given a version number MAJOR.MINOR.PATCH, increment the:

- MAJOR version when you make incompatible API changes
- MINOR version when you add functionality in a backwards compatible manner
- PATCH version when you make backwards compatible bug fixes

Conventional commits therefore aligns with this spec which makes it easier to write automated tooling on top of it.

## Structure of commits

Commits are structured as follows:

```
  <type>[optional scope]: <description>

  [optional body]

  [optional footer(s)]
```

The required section of the commit is the type and the description. The scope, body and footer are optional.

The elements that make up a conventional commit would contain the following:

- **fix**: a commit of this type fixes a bug in your codebase. This corresponds to PATCH in semver
- **feat**: a commit of this type introduces new features in your codebase. This corresponds to MINOR in semver
- **BREAKING CHANGE**: a commit of this types introduces a breaking change in your codebase. You denote a breaking change by appending a ! after the type, or by including BREAKING CHANGE
  in the footer. This corresponds with MAJOR in semver.

Other types apart from fix and feat include build, chore, ci, docs, style, refactor, perf, test e.t.c

I have recently being using this type of commits in my personal project and it makes explicit what each commit
does.

An example of a commit message would be:

```
  feat: implement authorization using context API
```

If there is a breaking change:

```
  feat!: implement ReactQuery for fetch rather than useEffect
```

## Conclusion

In summary, the conventional commits system helps developers in creating commit messages,
that communicate the nature of changes made in a codebase. This would be useful to them later on, teammates,
and other concerned stakeholders.

The full spec can be read on this [website](https://www.conventionalcommits.org/en/v1.0.0/)
