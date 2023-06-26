---
title: Pattern matching in Elixir
date: '2023-06-25'
status: "draft"
language: elixir
---

## Introduction

I started elixir a few weeks ago after reading about it on this [blog](https://ramp-engr). I mostly picked it up because I applied for an internship position at the Ramp which...well ended up with me being ghosted.

Nonetheless, it exposed me to a new language and a new way of thinking about programming.

I am going to be talking about the following:
- What is Pattern matching
- Pattern matching with lists


## What is Pattern matching

My understanding of pattern matching begins with the equal sign: `=`. In elixir, the equal sign is not only an assignment operator but also a match operator. It is used to match the left side of the expression to the right side of the expression.

The example below would return an error:
```elixir
iex> 5 = 2 + 2
```
`** (MatchError) no match of right hand side value: 4`
