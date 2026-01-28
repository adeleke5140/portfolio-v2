---
title: 'ogpk'
date: '2026-01-28'
status: 'in-progress'
---

ogpk by [Aladair Monk](https://www.alasdairmonk.com/) is a open-source tool for previewing opengraph metadata straight from the terminal. I have been looking for a tool like that, Vercel has one on their cloud platform but that's tied to their Infra. 

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

It also works for opengraph metadata on localhost which should be helpful for building OG images locally.

```zsh
ogpk -p http://localhost:3001/blog/unix-notes
```

I love tools like this that do one thing and do it well. I'll be writing on more of them as I come across them,