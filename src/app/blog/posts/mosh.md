---
title: 'Mosh: a Better SSH'
date: '2026-01-06'
status: 'completed'
tag: 'shell'
---

I set up a droplet on Digitalocean today, and then SSH'd into it with Ghostty. It worked okay but I also noticed that the latency was downright awful.

Every keystroke took a couple milliseconds to register. The server location was London which is relatively closer to Lagos than say San Francisco, but that didn't help much.

Running `ping <ip-address>` returned the following:

```bash
round-trip min/avg/max/stddev = 138.865/151.274/162.856/6.837 ms
```

The average round trip was around `151ms` which wasn't ideal.

I investigated with the help of Claude, and it revealed a number of ways to solve it. One interesting solution was a program called `Mosh`.

[Mosh](https://mosh.org/) is a mobile shell and calls itself a replacement for interactive `SSH` terminals. It supports roaming, reliability on spotty connections and implements a local echo.

With local echo, `Mosh` doesn't wait for the server reply before it shows the current keystroke. It was exactly what I needed.

## Setting up Mosh

I installed using homebrew.

```zsh
brew install mosh
```

Usage was straightforward.

```zsh
mosh <ip-address>
```

I immediately got an error. It complained about not being able to find the `mosh` server.

On my server I also had to install it. The server is `Ubuntu 24.04.3 LTS` and I installed with `apt`.

```bash
apt install mosh
```

You can find installation instructions for other distros on the [website](https://mosh.org/#getting)

Once installed, I connected again using:

```bash
mosh <ip-address>
```

It worked as intended.

The latency reduced drastically and it made typing less painful.

Interestingly, I didn't have to pass in my private key even though I have both `id_rsa` and `id_ed25519` present. With `SSH`, I have to run:

```zsh
ssh -i ~/.ssh/id_ed25519 root@<ip-address>
```

I guess `Mosh` probably scans the `.ssh` directory and tries every private key until one works.
