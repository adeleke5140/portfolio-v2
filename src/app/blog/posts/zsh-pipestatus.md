---
title: Zsh pipestatus
date: '2026-01-31'
status: 'in-progress'
tag: 'shell'
---

When you create a pipeline in the your preferred shell of choice, let's take `bash` as an example

```zsh
ls | fd oop.py | echo "hello world"
```

You retrieve the exit code of the last command by running `echo $?` but what if you wanted to get the exit code for
each of the commands in the pipeline?

Bash provides a convenient variable called `PIPESTATUS` which contains exactly that.

```zsh
ls | fd oop.py | echo "hello world"
echo "${PIPESTATUS[@]}"
> 0 0 0
```

It works okay in bash but not in my `zsh` and that's because the variable is instead called `pipestatus`
and you write it to the `stdout` stream by running `echo $pipestatus`.

In my shell though, only the last exit code was being returned which was unusual.

After a bit of digging on the interent, I found a [Stack Exchange Post](https://unix.stackexchange.com/questions/673321/zsh-pipestatus-disappears-in-the-following-prompt) which explained that when another process perhaps is using a pipe, it can override `pipestatus`, mostly in a `prompt` related automation.

In my `.zshrc` config, I use `powerlevel10K` and other useful tidbits, which could be the cause of the problem

After backing up my config and then deleting every line, I tried it again.

```zsh
ls | fd oop.py | echo "Hello World"; echo $pipestatus
```

and voila:

```zsh
0 0 0
```

I am still not sure what is responsible per se but I'll do a bit more digging and document it when I figure it out.
