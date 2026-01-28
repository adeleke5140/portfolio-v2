---
title: 'ogpk'
date: '2026-01-28'
status: 'in-progress'
---

ogpk by [Aladair Monk](https://www.alasdairmonk.com/) is a nifty tool for previewing opengraph metadata straight from the terminal. I have been looking for a tool like that, Vercel has one on their cloud platform but that's tied to their Infra. 

Pretty straightforward CLI tool. You just run:

```zsh
ogpk <url>
```

To install it, check out the [Github](https://github.com/almonk/ogpk)

After installation, open your terminal and run:

```zsh
ogpk -p https://www.kehinde.xyz/blog/unix-notes
```

Which should return:

![img](/images/ogpk-preview.webp)

Does it work for locally developed OG Images? It sadly doesn't. I tried running it.

```zsh
ogpk -p "http://localhost:3001/api/og?title=Unix%20and%20Server%20Notes"
```

and it returned nothing. If it supported localhost, it would be really useful for local development.

Since it's open source, I am thinking of contributing to it which means I'll have to brush up on my `go`. Sounds fun.
