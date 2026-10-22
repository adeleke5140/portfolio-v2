---
title: A Philosophy of Software Design
draft: true
status: 'draft'
date: '2026-02-26'
tag:
  - book-review
---

[A Philosophy of Software design](https://www.amazon.com/Philosophy-Software-Design-John-Ousterhout/dp/1732102201) by John Ousterhout is a book on how to design software in a way that helps manage complexity.

Complexity shows up in a number of forms. You could say, some symptoms show complexity that exists in a system. John gives the following:

1. **Change Amplification**
2. **Cognitive load**
3. **Unknown Unknowns**

Change Amplification is when you need to modify multiple modules for one concern. You can think of it as not having a singular source of truth and you need to modify multiple files for a particular change.

A good example in frontend would be, say you decide to use an arbitrary color value for the text utility in tailwind, if you need to change that color, you will have to change it everywhere else it's used.

Of course, modern tooling makes this easier since you can just global search for it's usage and then update at once, but a better design would be to use the tailwind variable system which helps you modify it in one place and you are guaranteed that the change will cascade to every place it is used in the system.

Cognitive load is the amount of time and energy it takes to understand a system. Of course large scale systems, say for example, NextJS would require some time to understand some of it's parts, because understanding most of it's part would indeed be a herculean task, but it can be structured in a way that is modular, and easy to reason about.

Complex systems on the other hand require a lot more cognitive load even for simple systems. -- need to add more on this to explain it better.

Due to the first two symptoms, the third Unknowns Unknowns are concerns/features of a system you don't know about that you don't know you don't know about, this is as a result of the cognitive load that exists and that prevents proper understanding of the system

How does John recommend we solve some of these problems? Well a number of ways, though the book leans towards a more Class-based approach, the advice contained are important as well.

One other concern he mentioned was tactical programming. A style of programming that prioritizes shipping speed without any concern for how the design of the system is or how the system should work appropriately.

Tactical programming is encouraged especially at startups that need to ship fast to get to market but the downside of that is that in ttrying to ship fast, you create technical debt that sometimes will help you capture the market but other times could even lead to a worse MVP that is also a pain to refactor and improve down the line.

Once you get bogged into the tactical lane, you sometimes are prone to taking the path of least resistance and continue to tactically solve problems. Essentially more tech debt on tech debt.

How does John recommend we solve some of these problems?

### Modules should be deep

Modules benefit from having simple interfaces with deep implementation. It is not worth it to have a shallow module that just increases the cognitive load of a system, it would be a bit redudant to say have the following module:

```ts
function addToList(list, item) {
  list.push(item)
}
```

Of course, you would laugh and say who would do that but you would be surprised with how widespread this is in the wild where developers are prone to prematurely abstract away regular operations. This leads to burden when trying to understand the system.

A good example of an interface that abstract away complexity is reading file streams or writing file streams in `NodeJS`, the `fs.createReadStream` method uses a buffer under the hood which improves the performance of I/O operations, the consuemer of this method do not need to understand all of the compleixty of the implementation.

It abstracts the regular or common usage of I/O -- most people want to do I/O with a buffer than without. John recommends that the more often used patterns should be automatically exposed through the interface with a fallback for the less often used features. So in this case, if you want to disable buffers during I/O operations, the interface provides you with a easy approach to opt out of it.
