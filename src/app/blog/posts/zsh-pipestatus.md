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

You can get the exit code of the last command by running `echo $?` but what if you wanted to get the exit code for 
each of the commands in the pipeline?

Bash provides a convenient variable called `PIPESTATUS` which contains a list of exit codes.

```zsh
ls | fd oop.py | echo "hello world"
echo "${PIPESTATUS[@]}"
> 0 0 0
```

That all works okay but the command doesn't seem to work in `zsh` and that's because the variable is called `pipestatus`
and you write it to the `stdout` by running `echo $pipestatus`.

In my shell  only the last exit code was being returned which was strange.

After a bit of digging on the interent, I found a [Stack Exchange Post](https://unix.stackexchange.com/questions/673321/zsh-pipestatus-disappears-in-the-following-prompt) where a similar question was asked.
Apparently, when something else is using a pipe, it can override `pipestatus`, mostly in a `prompt` related automation.

What immediately came to mind was my `.zshrc` config. I have `powerlevel10K` setup and other useful tidbits, something there could be overriding it.

I backed up my file and then deleted every line.

After that, I tried it once again.

```zsh
ls | fd oop.py | echo "Hello World"
echo $pipestatus
```

and it returned:

```zsh
0 0 0
```

I am still not sure what is responsible per se but I just wanted to document this. I'll do a bit more digging during the weekend.
