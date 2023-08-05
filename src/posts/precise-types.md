---
title: Use Precise types instead of String types
date: '2023-08-05'
language: typescript
status: completed
tag: typescript
---

## Introduction
We have all been there. Throwing `any` at function parameters and object keys because we couldn't be bothered to type it precisely. I did that for a recent project and it was a cop out.

The problem is that with `any`, we lose many of the benefits typescript offers us. The compile time error checking that can catch hard to detect bugs and also the wonderful code completion.

Today, I am gonna be discussing precise types and how they can make our code better.

## Precise Types

A bit of a background. I am currently on Item 33 of Dan Vanderkam's effective typescript. I have been going through the book for quite a while. Nowadays, I ensure to actually type out and reason through the code. It ensures I really understand it.

Item 33 argues that string types are too broad and open up code to a lot of errors.

We should consider more precise alternatives that specifies the type of data we expect.

## Example 

The best way to illustrate this is with an example. 

Suppose, we have a utility function `pluck`.

The function of `pluck` is to pull out all the values for a single field in an object. The objects are members of an array.
Properly typing the `pluck` function can help in making sure that we only use existing keys
that exist in the object.

To illustrate this properly, I am going to use 4 variants of the `pluck` utility function. It would range from untyped to typed. 

Let's go:

The pluck function without any type(no-pun intended) is this:

#### Version 1:
```typescript
  function pluck(records, key){
    return records.map(record => record[key])
  }
```

Here the function is untyped and while it works at runtime, it opens up a can of errors.
We aren't sure that the key we use actually exist, which means we might be trying to access a property not present. The return type is also an `any[]`. It is practically still valid `TS` code but without any benefits.

#### Version 2:
```typescript
  function pluck(records: any[], key: string): any[]{
    return records.map(record => record[key])
  }
```

Here in the second version, it is slightly better but the string type is still too broad. 
Remember that this string could also not exists on the object we need to access. The `any` type is also problematic.

#### Version 3:
```typescript
  function pluck<T>(records: T[], key: string){
    return records.map(record => record[key])
  }
```

We make the function a generic so that it can infer the specific type of array it is. The type checker complains.

![typeError](https://github.com/adeleke5140/portfolio-v2/blob/new-post/public/images/pluckV3error.png?raw=true)

We cannot use a string key on an `unknown` type.

The problem here still persists and this is because string is still broad. It is **stringly typed**. The return type is also still `any[]`

### Version 4:
```typescript
  function pluck<T>(records: T[], key: keyof T){
    return records.map(record => record[key])
  }
```

We are making some progress here. We constrain the key so that it is only an existing key on the object. Typescript infers the return type is not specific enough.

If you mouse over the function, the return type is `T[keyof T][]`
In this case, if there are four keys with values of type `number` and `string`, the compiler infers the returned `array` as a `string` or number `array`.

It can be better.

### Version 5:
```typescript
  function pluck<T, K extends keyof T>(record: T[], key: K): T[K][]{
    return records.map(record => record[key])
  }
```

Perfecto. In this final function, we have a generic function with two parameters. `T` and `K` which denotes the object and a key of the object. The second parameter K is a subset of `keyof T` Using this variant, we get straightfoward autocomplete of the known properties in the object.

Here is an concrete example:

```typescript
  type RecordingType = "studio" | "live"

  type RecordType = {
    artist: string,
    title: string,
    releaseDate: Date,
    recordingType: RecordingType
  }

  const recordsArr: RecordType[] = [
  {
    artist: "Ed Sheeran",
    title: "Perfect",
    releaseDate: new Date(),
    recordingType: "studio",
  },
  {
    artist: "zedd feat Jon Bellion",
    title: "Beautiful now",
    releaseDate: new Date(),
    recordingType: "live",
  },
  {
    artist: "Zinolessky",
    title: "Many things",
    releaseDate: new Date(),
    recordingType: "studio",
  },
];

const artistArr = pluck(recordsArr, 'title')
```

Using the `TS` playground, we see that we get nice autocomplete.

Check it out in the [Live playgroun.d](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABABwDYggawDwBUA0iA0ogKYAeUpYAJgM6KakCecwiuAfABQBOpEOL3oAuDgG0AuoSbMRRAJRjc4opKkBvALAAoRIn5QQvJP0HC6AOgC2AQ2R8BQmogC8nA0+HjZkhboBfXV0oZmRSRAAlLxoYMABzXDCI10QAIjojWLg0xAAfdNQYADdSNOCdUPComKTq1O09fURbXlhMsUzeOPj8XWbEWChUUk6oboS+pv1+Eds6UgARWyoxZaopgbNnHrrRmvNYhL3+xCCdXUEwTJbeXjFow72pN0RxU8aB1vaoMTTSGhpTbNIYjP7hXjAARQIGnGakOYLdb7MCkADuiGR3AUwPhh12yT+mRA2VhTQCwM+zW+MA66QAXgCyQNQfs0szmrNSPMlisUejMXzsbjPPjjoTCiUysCKR84bcfn96XE4CM6HRMMwOfpWX8wHBENYhBErrFYAhtZ5EbzVohURisTj5dthATwkSsvAObKdJIANwVK43GmZBipNAYTDcVq8QgAchDUDj-h0Qagop24vCYZQ6Cw0bu8ZdR0SyWTQA)

## Conclusion

Typescript offers us a lot quality of life improvement for DX. Even though it can be tempting to throw any all over the place, using precise types benefits far outweighs the trouble of thinking a bit more about our types.

The effective typescript book is great. Check it out as well [here](https://effectivetypescript.com/)
