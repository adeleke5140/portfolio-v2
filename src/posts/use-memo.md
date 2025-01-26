---
title: The useMemo hook
date: '2023-02-11'
status: 'draft'
language: 'jsx'
---

## Introductions

I feel like we have all got that moment where we wanna remember something but can't quite figure out what it is. For me, it is on the tip of my tongue but I can't just...recall. A memo would have helped.

The word memo is short for memorandum. The word's etymology is from the Latin word _memorandum_ which means "to be remembered". We essentially use memos to remember things.

The useMemo hook is one of the most useful hooks in React. It is also one of those hooks that took me a while to understand. I finally have a grasp of it, and I want to share what I have learned.

I am gonna be talking about the following:

- What is useMemo
- Memoizing expensive calculations

## What is useMemo

The useMemo hook allows us to **remember** computed values between renders.

From the React docs:

```jsx
import { useMemo } from 'react'

const cachedValue = useMemo(calculateValue, dependencies)
```

The cachedValue is reused across rerenders when the dependencies haven't changed from the previous render.

Understanding what a render is and why React does it is vital.
React renders to keep our application UI with our state.
When the state changes, React rerenders to keep our UI up to date.

A rerender creates a picture of what the DOM should look like based on the state.
Josh has a fantastic article about rerenders, which you can check out [here](https://www.joshwcomeau.com/react/why-react-re-renders/)

## Memoizing expensive calculations

A simple example of this is with a component:

```jsx
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(100)

  const allOdd = []
  for (let i = 0; i < num; i++) {
    if (i % 2) {
      allOdd.push(i)
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

What could be problematic is when we have an expensive calculation/operation that doesn't need to be recalculated when the count has changed and the component rerenders.

In the example above, we calculate all the odd numbers between 1 and 100. The issue is that, every time we increase the count, react recalculates the value even though our upper limit of 100 has stayed the same.

This is where the `useMemo` hook becomes useful.

We can memoize the value, especially if the dependencies have stayed the same.

```jsx
import { useMemo } from 'react'
//rest of code
const allOdd = useMemo(() => {
  const result = []
  for (let i = 0; i < num; i++) {
    if (i % 2) {
      result.push(i)
    }
  }
  return result
}, [num])

//rest of code
```

The `useMemo` does all we need it to do. One thing to note is, you don't need to optimize prematurely. Only memoize components after you have figured out that it is a performance bottleneck.

The react docs give a good explanation of how to figure out a calculation is expensive.

> React docs: [how to figure out an expensive calculation](https://react.dev/reference/react/useMemo#how-to-tell-if-a-calculation-is-expensive)

## Conclusion

The useMemo hook is a crucial react API that helps us memoize expensive computation between rerenders. It can also be used in other cases like memoizing components. This latter case has yet to be explored in the article but I will be writing about it in the future.

Thanks for reading.

## Resources

- [React docs](https://react.dev/reference/react/useMemo)
