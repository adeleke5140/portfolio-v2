---
title: The useMemo hook
date: '2023-02-11'
status: 'in-progress'
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

From the React docs:
```jsx
import { useMemo } from 'react'

const cachedValue = useMemo(calculateValue, dependencies)
```

The cachedValue is reused across rerenders when the dependencies haven't changed from the previous render.

It is vital to understand what a render is and why React does it.
React renders in order to keep our application UI with our state.
When the state changes, React rerenders in order to keep our UI up to date.

Like Josh says:
> The main thing that React does is keep our UI in sync with our application state. The tool that it uses to do this is called a “re-render”."

A rerender creates a picture of what the DOM should look like based on the state.
Josh has an amazing article about rerenders which you can check out [here](https://www.joshwcomeau.com/react/why-react-re-renders/)

## Memoizing expensive calculations
A simple example of this is with a component:

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(100);

  const allOdd = [];
  for (let i = 0; i < num; i++) {
    if (i % 2) {
      allOdd.push(i);
    }
  }

  return (
    <div>
      <label htmlFor="number">Select Number:</label>
      <input
        type="number"
        id="number"
        value={num}
        onChange={(e) => setNum(e.target.value)}
       />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add Count</button>
      <p>
        There are {allOdd.length} odd numbers between 0 and {num}
      </p>
    </div>
  )
}
```

In the example above, React rerenders to update the value of count when the button is clicked. That is clear enough.

What could be problematic is when we have an expensive calculation/operation that don't need to recalculated when count has changes and the component rerenders.

In the example above, we are calculating all the odd numbers between 1 and 100. The issue here is that, everytime we increase the count, react recalculates the value even though our upper limit of 100 hasn't changed.

This is where the `useMemo` hook becomes useful. 

We can memoize the value especially if the dependencies haven't changed.

```jsx
 import { useMemo } from 'react'
 //rest of code
 const allOdd = useMemo(() => {
    const result = [];
    for (let i = 0; i < num; i++) {
      if (i % 2) {
        result.push(i);
      }
    }
    return result;
  }, [num]);

  //rest of code
```

The `useMemo` does all we need it to do. One thing to note is that, you don't need to optimize prematurely. Only memoize components after you have figured out that it is a performance bottleneck.

The react docs gives a good explanation of how to figure out a calculation is expensive.
> [how to figure out an expensive calculation](https://react.dev/reference/react/useMemo#how-to-tell-if-a-calculation-is-expensive)

## Conclusion