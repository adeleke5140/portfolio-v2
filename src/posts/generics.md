---
title: Breaking down generics with an example
date: '2023-02-17'
---

## Introduction

Learning Typescript has been a major boost to my career. The basics were not too difficult to grasp,
and after going through a Vscode Livestream and a couple of exercises from Matt Pocock, I believed I was
ready. Until I met generics. 

Generics were a strange feature I couldn't wrap my head around. They weren't simple `type annotations` I was used to
and when combined, confused me further. I gave up on it...for some time.

One thing about me though is that I always get back up. This was a subject I didn't understand yet I was going to 
learn it. If one resource doesn't help, I will try another.

With that, I went to the [docs](https://www.typescriptlang.org/docs/handbook/2/generics.html) and read that while waiting to see the doctor. I got a bit out of it but it still
wasn't 100% clear. The text that did it for me was this [blog post](https://ts.chibicode.com/generics/) by *Shu Uesugi*. Shu is an amazing teacher.

What I do wanna do today though, is break down an example he illustrated in my own words. In a bid to explain it,
I believe I will understand it better.

## Breaking down a generic Func

Here is a sample generic function:

```typescript
    function MakeState<
        F extends number | string,
        S extends string | F
        >(){
        let pair: { first: F, second: S}

        function getPair(){
            return pair
        }

        function setPair(x: F, y: S){
            pair = {
                first: x,
                second: y
            }
        }

        return { getPair, setPair }
    }
```

_I am currently struggling with syntax higlighting in remark so if you could help, I'd appreciate it._

On to the generics stuff. \
The function `MakeState` is a generic function. In the body of the function, we have two functions. One called
`getPair` and another `setPair` which are used for getting and setting the pair variable with a set of `object` keys. Then we return an object with those two functions.

Though that's not the interesting part. 

The function `MakeState` is generic because it takes in\
`type` parameters and with that determines what `type` the values of the object should be.

The first type `F extends number | string` means that, our first parameter is constrained to be a subtype of the type `number` or `string` and no other type.
This means that, when we call the function, we can only apply `types` that are a subset of number or string.
This is what I mean:

We can pass in the type `number`
```typescript
    let newState = MakeState<number, number>()
```

or we could also use a `literal` type
```typescript
    let newState = MakeState<2,2>()
```

Why does a literal type work?

Well think of types as a set. Thank you *Lere* for reminding me of this. In the a `string` set, string values
are a subset of that set. Therefore, for type `string` we can use the `string` type or a literal value.

If thinking of `types` as set is a bit confusing, check out this [resource]()

The second type `S extends string | F` means that, our second parameter is constrained to the `type` string,
and the `type` of `F` we initially typed in.

Here's an example:

```typescript
    let newState = MakeState<string, string>()
```
We could have it like this:
```typescript
    let newState = MakeState<number, number>()
```
or with literal types:
```typescript
    let newState = MakeState<"kehinde","kehinde">()
```