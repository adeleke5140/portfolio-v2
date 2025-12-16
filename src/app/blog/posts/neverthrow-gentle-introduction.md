---
title: 'Neverthrow, a Gentle Introduction'
date: '2025-12-16'
status: 'in-progress'
tag: 'typescript'
---

For quite a while writing software, I didn't think much about errors. The happy path was all that mattered, and I would only look into _error handling_ when a runtime error occurred. Validators like Zod and Arktype, have helped add an extra layer of validation to values the Typescript compilers cannot verify. Yet, while they do help limit runtime errors, they still don't offer typesafe errors.

The more I wrote software, the more I realized that errors shouldn't be an afterthought.

> If anything can go wrong, at some point it will go wrong.

Software should be predictable, but the happy path isn't always the predictable path, errors lurk, in various parts of our program and they can be triggered when certain conditions are met.

I don't think `try` `catch` really helped either because it didn't provide me with a good mental model of how to think about errors after `throwing` it. I played around with a custom `Result<T,E>` similar to Rust's [Result Type](https://doc.rust-lang.org/std/result/) which I like where recoverable errors are returned as values but that only worked for simple cases, and there were a lot of edge cases that wasn't handled with it. It does take quite significant effort to build out a feature-rich, robust type-safe error handling system.

`NeverThrow` is that. For a solid introduction, Jökull has a post you can read [on his blog](https://www.solberg.is/neverthrow). I have taken that and expanded it into a `BUN` server with some type error fixes. These are my initial thoughts on the ergonomics.

## Neverthrow in Action

Let's say we fetch and parse some resources from an API. We want to return type-safe errors. In the example below, we use `ok`, `err` and `Result` primitives with around the parsing process. This is the the same function Jökull uses but I've adapted it for zod v4.

```typescript
import { err, ok, type Result } from 'neverthrow'
import type { z, ZodError } from 'zod'

interface ZodParseError<T> {
  type: 'zod'
  errors: ZodError<T>
}

export function safeZodParse<TSchema extends z.ZodType>(
  schema: TSchema
): (
  data: unknown
) => Result<z.infer<TSchema>, ZodParseError<z.infer<TSchema>>> {
  return (data: unknown) => {
    const result = schema.safeParse(data)
    return result.success
      ? ok(result.data)
      : err({ type: 'zod', errors: result.error })
  }
}
```

We use zod's `safeParse` to return the error rather than just throwing which `parse` does. We also infer the resulting type of the value from the Schema, as well as the resulting error when validation fails

I particularly like the `Interface` up above because `neverthrow` helps us narrow in the error case.

Let's look at a type-safe `fetch` function that lets us know about possible errors that could occur while fetching and parsing some `JSON`

```typescript
import { err, ResultAsync } from 'neverthrow'

type FetchError<E> = NetworkError | HttpError<E> | ParseError

interface NetworkError {
  type: 'network'
  error: Error
}

interface HttpError<E = unknown> {
  type: 'http'
  status: number
  headers: Headers
  json?: E
}

interface ParseError {
  type: 'parse'
  error: Error
}

type FetchResult<T, E> = ResultAsync<T, FetchError<E>>

export function safeFetch<T = unknown, E = unknown>(
  input: URL | string,
  init?: RequestInit
): FetchResult<T, E> {
  return ResultAsync.fromPromise(
    fetch(input, init),
    (error): NetworkError => ({
      type: 'network',
      error: error instanceof Error ? error : new Error(String(error)),
    })
  ).andThen((response) => {
    if (!response.ok) {
      return ResultAsync.fromSafePromise(
        response.json().catch(() => undefined)
      ).andThen((json) =>
        err({
          type: 'http',
          status: response.status,
          headers: response.headers,
          json: json as E,
        } as HttpError<E>)
      )
    }

    return ResultAsync.fromPromise(
      response.json() as Promise<T>,
      (error): ParseError => ({
        type: 'parse',
        error: error instanceof Error ? error : new Error(String(error)),
      })
    )
  })
}
```

There's quite a lot of code to wrangle with but the general idea I like is that we pass in callbacks for each error case and when they might occur. Coupled with `FetchError<E>` this allows for a discriminated type, where based on the type of error, we can extract the corresponding error data. `fetch` returns a `Promise` and `ResultAsync.safePromise` is appropriate for that.

Sometimes, though, there are errors that are thrown synchronously from a function that also returns a Promise. I have this piece of code:

```typescript
async function doStuff(): Promise<SomeResult> {
  if (!slug) {
    throw new Error('Unable to determine which blog post to read')
  }

  doAsyncStuff()
}
```

In the case above, `ResultAsync.fromThrowable` is better suited.

Actual implementation of this in action will be:

```typescript
import z from 'zod'
import { safeFetch } from './lib/safe-fetch'
import { safeZodParse } from './lib/safe-zod-parse'

export type PATH = 'facts' | 'facts/random' | 'facts/broken'

const catSchema = z.object({
  facts: z.array(z.string()),
})

// We've got a bun http server running on port 3000
async function main(path?: PATH) {
  const res = await safeFetch(`http://localhost:3000/${path}`).andThen(
    safeZodParse(catSchema)
  )

  res.match(
    (value) => console.log(value.facts),
    (error) => {
      switch (error.type) {
        case 'http':
          console.err('http error, could not connect')
          break
        case 'network':
          console.err('network error')
          break
        case 'parse':
          console.err('parsing error')
          break
        case 'zod':
          console.err('validation error')
          break
      }
      return
    }
  )
}

main('facts/random')
```

I tried the `isOk()` and `isErr()` methods but I wasn't getting a proper discriminated result from that. By which I mean, after checking for `isErr()` and returning the result, I expect the tye to be narrowed to the `isOK()` path. But that could just be something I've missed with the implementation details, I'll check the docs for more info.

[Pattern matching](https://doc.rust-lang.org/book/ch19-01-all-the-places-for-patterns.html) is pretty nice so I've decided to go with that. You can also use `map` and `mapErr` to get the value and the error.

```typescript
res
  .map(({ facts }) => console.log(facts))
  .mapErr((err) => console.err(err.type))
```

I like what I've seen so far and the next step is to rewrite my markdown fetching logic and the Hono server powering Hanashi's chrome extension. I will write a follow up on how that goes including quirks I run into with the rewrite.

Thanks for reading.
