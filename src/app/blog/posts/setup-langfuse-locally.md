---
title: 'Setup Lanfuse Locally'
date: '2026-01-28'
status: 'completed'
tag: 
    - AI
    - Observability
    - Langfuse
---

Langfuse allows you to observe agent runs and group agent runs by users and sessions. It's a must-have tool for AI Product development.

The definitive guide to setting up langfuse with Docker compose can be found onn their
[docs](https://langfuse.com/self-hosting/deployment/docker-compose).

It can be simpler though because rather than clone the whole repo, all you need is to grab the `docker-compose.yml` file and then run:

```zsh
docker-compose up -d
```

Also, if you are on MacOS, check out [Orbstack](https://orbstack.dev/). I find it more pleasant to use compared to Docker Desktop. It's free for personal use.