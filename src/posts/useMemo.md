---
title: Breaking down useMemo in order to understand it
date: '2023-02-11'
---

## Introduction

The new beta react docs is clearer than the old one. I never liked the old one. It was also a hassle to read and the language albeit in English,
wasn't that easy to understand.

The new ones are an overall improvement and with that, I have been revisiting certain concepts. I have gone through some of the hooks like useState and useEffect but haven't written about my understanding of it.
This time though, I would like to write about useMemo.

Most of this was written in Notion as I went through Josh Comeau's blog post -- fantastic teacher -- so it would just be the summary with major edits on the grammer and sentences.

Hopefully, I can revisit these notes when I need to have a referesh on the useMemo hook.

## What is useMemo
The useMemo hook allows us to **remember** computed values between renders.

It is vital to understand what a render is and why React does it.
React renders in order to keep our application UI with our state.
When the state changes, React rerenders in order to keep our UI up to date.

Like Josh says:
> The main thing that React does is keep our UI in sync with our application state. The tool that it uses to do this is called a “re-render”."

A rerender creates a picture of what the DOM should look like based on the state.

_...in progress_