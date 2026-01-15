---
title: 'Neverthrow, a Gentle Introduction'
date: '2025-12-16'
status: 'completed'
tag: 'typescript'
---

For quite a while writing software, I didn't think much about errors. The happy path was all that mattered, and I would only look into _error handling_ when a runtime error occurred.

Validators like Zod and Arktype helped because they added an extra layer of runtime validation to values the Typescript compiler could not verify at compile time.

But then, I wondered, what about code paths where validation alone was not enough? Could we encode the potential for failure in our programs and surface the errors to handle it gracefully?

## Thinking about Solutions

The more I write software, the more I realize that errors shouldn't be an afterthought.

> If anything can go wrong, at some point it will go wrong.

Software should work predictably. The happy path isn't always the predictable path. Errors lurk, in various parts of our program, and they can be triggered when certain conditions are met.

I have used `try/catch` and it helps but it's kinda awkward since it tends disrupt the way I reason about control flow in my programs. It didn't provide me with a good mental model of how to think about errors after `throwing` it.

I have also tried to create a custom `Result<T,E>` similar to [Rust's](https://doc.rust-lang.org/std/result/) where recoverable errors are returned as values, but that only worked for simple cases.

There were a lot of edge cases that weren't handled by my implementation. It takes quite a significant effort to build out a feature-rich, robust, typed, error handling system.

`NeverThrow` is exactly that. It's a lib that helps "encode failability in the typesystem"[^1]

For a solid introduction, Jökull has a post you can read [on his blog](https://www.solberg.is/neverthrow). I have taken that and expanded it into a simple web server built with `bun` with some slight modification and fixes.

## Neverthrow in Action

Let's say we fetch and parse some resources from an API. We want to return typed errors for code paths that might lead to errors.

In the example below, we use `ok`, `err` and `Result` primitives with the zod validation. This is the same function Jökull uses but I've adapted it for Zod v4.

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

We use zod's `safeParse` to return the error rather than just throwing which `parse` does. We also infer the resulting type of the value from the Schema, as well as the resulting error when validation fails.

I particularly like the `Interface` because `neverthrow` uses it to help us narrow in the error case.

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

There's quite a lot of code to wrangle with but the general idea I like is that we pass in callbacks for each error case and when they might occur.

Coupled with `FetchError<E>` this allows for a discriminated type, where based on the type of error, we can extract the corresponding error data. `fetch` returns a `Promise` and `ResultAsync.safePromise` is appropriate for that.

Sometimes, though, there are errors that are thrown synchronously from a function that also returns a Promise. I have this piece of code:

```typescript
async function doStuff(slug: string): Promise<SomeResult> {
  if (!slug) {
    throw new Error('Slug not present, cannot determine which blogpost to read')
  }

  doAsyncStuff()
}
```

In the case above, `ResultAsync.fromThrowable` is better suited.

Let's see how to use the `safeZodParse` and `safeFetch` in a simple web server.

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

[Pattern matching](https://doc.rust-lang.org/book/ch19-01-all-the-places-for-patterns.html) is pretty nice so I've decided to go with that. We can also use `map` and `mapErr` to get the value and the error.

```typescript
res
  .map((value) => console.log(value.facts))
  .mapErr((err) => console.err(err.type))
```

I like what I've seen so far and the next step, is to rewrite the markdown fetching logic for my blog. and improve error handling in the Hono server powering Hanashi's chrome extension. I will write a follow up on how that goes including quirks I run into.

Thanks for reading.

[^1]: [Introduction: Type Safe Errors in JS & TypeScript](<https://github.com/supermacro/neverthrow/wiki/Introduction:-Type-Safe-Errors-in-JS-&-TypeScript-(10-minute-read)>)
