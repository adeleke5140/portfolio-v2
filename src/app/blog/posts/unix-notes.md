---
title: 'Unix and Server Notes'
date: '2026-01-19'
status: 'completed'
---

I spent the first three weeks in January learning and relearning servers, domains, linux, nginx and docker.

I am not sure how detailed I want this note to be but I want it to be a public log. It's a record of how I was thinking at the time.
Something I will probably look back on kindly in a couple of months.

There really isn't an order, it's just gonna be a list of things as I remember them.

Domain registrars like **namecheap** are pretty neat and they allow you a piece of the internet, since they grant you the access of getting a
human-readable web domain which you can then connect to an IP address.

I used DigitialOcean for the first time. I bought a Droplet for $4/month and installed `Ubuntu LTS` on it. It came with `10GB` of SSD storage and `512MB` of RAM. My macbook pro has 16GB. There really is a lot to think about when you have so little `RAM`. How much `RAM` did [Apollo Guidance Computer](https://en.wikipedia.org/wiki/Apollo_Guidance_Computer) have again?

Once you've gotten the domain, you can manage it with DigitialOcean. A, CNAME, txt records etc.

After acquiring a domain, there are a number of UNIX utilities that provide you with technical information on/for the domain. They include:

- `curl`
- `dig`
- `nslookup`
- `nmap`
- `ping`

They do a number of things and their full description can be gotten from their man pages.

```zsh
man curl | head -n 10
```

gives the ff output

```zsh
curl(1)                           curl Manual                          curl(1)

NAME
       curl - transfer a URL

SYNOPSIS
       curl [options / URLs]

DESCRIPTION
       curl is a tool for transferring data from or to a server using URLs. It
```

`man` pages are awesome because they give prvide detailed explanation of the util. When the internet is down, it will come in handy.

Mosh is a great tool for working with `SSH` connections like the one I have on DigitalOcean. It improves keystroke latency and you can read more about it [here](./mosh.md)

In the article above, I was logged in as root which is something you shouldn't do. Creating a user group and removing disabling root access is the better approach.

Now I access my server with:

```zsh
mosh ken@<ip-address>
```

where ken is the user I created without sudo permissions. `sudo` is short for `superuser do` and I need to append it when I need to run commands that require root privileges.

`chmod` is useful for changing the `read`, `write` and `execute` access to a file and `chown` is used for changing the ownership access of a file. File or directories, they both apply.

Running `ls -la` reveals the content of a directory and permissions of files and directories.

```zsh
drwxrwxr-x 3 ken ken 4096 Jan 11 23:27 go
-rwxrw-r-- 1 ken ken  123 Jan 11 17:35 init.sh
drwx------ 3 ken ken 4096 Jan 19 12:44 snap
```

When in a low-resource setting, you start to realize how much precious RAM is. Node hogs too much of it and a compiled langugage works better. Especially a compile languge that is also lightweight and doesn't use all your RAM for installing the compiler.

`Rust` was my first choice but I couldn't even install `rustup` so I had to settle for...`Go` which I suprisingly came to like. [Here](https://github.com/adeleke5140/simple-go-wss) is a websocket implementation in `Go` thanks to both Medium Authors and lessons from ChatGPT.

```go
conn, err := upgrader.Upgrade(w,r,nil)
if err != nil{
    log.Fatalf("Couldn't upgrade, %s",err)
}
```

I like the `:=` syntax.

Even with a compiled language like `Go` you can run into problems with `go build`. I couldn't run it on the droplet. The solution was to build locally and then transfer the binary over scp to my server.

You can view resource usage with `htop` and watch free and used memory with `free`.

You can see how much the memory allocation changes per second with:

```
watch -n 1 free -h
```

Back to `scp`

Here is man intro to `scp`

I copied it over with:

```
scp server ken@<ip-address>:<path-to-working-directory>
```

Short description from `man`

```zsh
SCP(1)                      General Commands Manual                     SCP(1)

NAME
     scp – OpenSSH secure file copy

SYNOPSIS
     scp [-346ABCOpqRrsTv] [-c cipher] [-D sftp_server_path] [-F ssh_config]
         [-i identity_file] [-J destination] [-l limit] [-o ssh_option]
         [-P port] [-S program] [-X sftp_option] source ... target

DESCRIPTION
     scp copies files between hosts on a network.

     scp uses the SFTP protocol over a ssh(1) connection for data transfer,
     and uses the same authentication and provides the same security as a
     login session.

     scp will ask for passwords or passphrases if they are needed for
     authentication.
```

This was very nifty albeit not as fast. I wonder if it's dependent on both my `ISP` and my server.

On `Linux` servers, `nginx` can help with load-balancing, routing, and even returning `html` plus many more.

The config file is in the `/etc/nginx/nginx.conf` file. With server configuration in `/etc/nginx/sites-enabled` which you setup for your domain after aquisition. Here's one file for my domain

```txt
server {
        root /var/www/html;
        index index.html;

        server_name <domain-name>;
        access_log /var/log/nginx/access.log upstreamlog;
        location / {
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_http_version 1.1;
                proxy_pass http://gobackend;
        }
}
```

Logs are stored in the `access.log` file and `nginx` manages load through round robin. The `gobackend` config lives in the `nginx.conf` file.

Honestly, I hadn't done much server work and now I've gained an appreciation of all the parts required for modern websites to work. Perhaps, there is more `nginx` work for me in the future.

I also setup `SSL` with [Certbot](https://certbot.eff.org/instructions) which does all the heavy lifting after running a number of simple commands.

Docker is really cool for boxing things up and making them easily reusable. I created a `Dockerfile` that intialied `go-lang` and `alpine`. It allows me to spin up as many server applications as possible. `nginx` balances all of this after some setup.

Prior to this, I used `pm2` which is a package for managing processes. It can also kick of processes from other language binaries.
The [npm page](https://www.npmjs.com/package/pm2) is a good place to start.

Here is the `Dockerfile`

```txt
FROM golang:1.25-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o server .

FROM alpine:3.22
WORKDIR /app
COPY --from=builder /app/server .
COPY --from=builder /app/index.html .
EXPOSE 3000
CMD ["./server"]
```

A bit complex but we start with a builder where we initialize `go` and then copy it over to our `alpine` base, and then run it from there.

Working with Go led me to reading about `containers` and `virtual machines` and the summary is `containers` use the same `kernel` as the host while `virtual machines` have their own kernel, OS, utils e.t.c They are also pretty heavy. My DigitalOcean droplet is a `VM` and I have `linux` containers running on it. I can't use `windows` containers.

You actually run into problems with building an image on a 500MB droplet. Because of that I had to create a `1GB` swap file since my server kept running out of memory.

Snippet used:

```zsh
#create a 1GB swap file
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# make it permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

`tee` is also pretty nifty.

```zsh
man tee | head -n 10
```

```sh
TEE(1)                                       User Commands                                      TEE(1)

NAME
       tee - read from standard input and write to standard output and files

SYNOPSIS
       tee [OPTION]... [FILE]...

DESCRIPTION
       Copy standard input to each FILE, and also to standard output.
```

`fstab` has a number of entries I do not want to tamper with so the `-a` flag just appends to the file.

Docker images are built with

```zsh
docker build -t <name-of-app> .
```

and ran with

```zsh
docker run -d -p 3000:3000 <name-of-app>
```

Docker is really and I'm looking forward to using it some more.

Other interesting utlities include [btop](https://github.com/aristocratos/btop) and [pfetch](https://github.com/dylanaraps/pfetch). `pfetch` is a lightweight sys information tool and I used it to regularly get an overview of how much RAM I was using. Sample output:

```zsh
         _      ken@ubuntu-s-1vcpu-512mb-10gb-lon1-01
     ---(_)     os     Ubuntu 24.04.3 LTS
 _/  ---  \     host   Droplet 20171212
(_) |   |       kernel 6.8.0-90-generic
  \  --- _/     uptime 12d 6h 21m
     ---(_)     pkgs   699
                memory 218M / 458M
```

`pfetch` is around 2000 lines of code. Pretty neat.

Overall, this was a good exercise because I filled a lot of knowledge gaps. I've also gained more appreciation for unix based systems.
