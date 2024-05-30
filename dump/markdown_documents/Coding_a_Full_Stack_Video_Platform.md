---
title: "Coding a Full Stack Video Platform"
date: Mon Mar 18 2024 07:36:43
type: web
---

Recently, the idea of self-hosting was so intriguing that I decided to code a full-stack video platform.

## Cloud Object Storage Selection

There are many Object Storage providers, including Amazon AWS, Akamai, Digital Ocean, Cloudflare, Alibaba Cloud. Nearly all of them are compatible with AWS S3 storage. I previously tried to self-host Nextcloud and File Storage with s3fs, but they are pretty slow on the frontends, capping at about less than 1 MB/s, in fact, too slow for the storage to be utilized.

Choosing either is fine, but I chose Cloudflare because Cloudflare R2 is very fast and efficient, and I am already using Cloudflare services. It is slightly more expensive than Dropbox, but self-hosting is so much fun and controllable than using a proprietary service. Dropbox is generally good enough to use, except for a few occasions when the Dropbox frontend UI dies.

Cloudflare is good because it is really cheap and offers many other services, like a proxy for servers to prevent against DDOS, and it is also a domain registrar. Cloudflare has everything except VPS for web hosting.

I tried contacting Alibaba and got a response, unfortunately, I use neither of those apps(just deleted Telegram). Alicloud is probably the cheapest for 1 PB storage, at 132120 dollars a year(while Cloudflare is 15 dollars/month for 1 TB and Amazon is around 22 dollars/month for 1 TB except for its glacier archives). Dropbox has like 10 dollar/month for 2 TB, but I reckon if people actually utilized their Dropbox storage the company will go bankrupt. that if I want to start a business (if in China) it can be a viable choice.

<img src="https://blog.jimchen.me/Screenshot%20from%202024-03-18%2008-42-39.png"/>

## Designing the Backend

After that, I init the PostgreSQL and added some user and video schemas.

I started coding with raw metal with Golang, and then I was busy for like a week, then I accidentally threw away the draft, so I started over again. It's not like I coded a lot anyway.

Mainly because Invidious uses S3. Using Node.js is totally feasible, I just wanted something new to try for fun.

I didn't know Ruby language before, but Crystal is still very easy to pick up, and it claims to be lightning quick (as quick as C language).

Designing the backend is pretty easy, as I aim for a small-scale project. Just sync everything before uploading to Object Storage, add them to the local database. Then retrieve everything from the local database.

The current backend looks like this

```
├── config.yml
├── LICENSE
├── shard.lock
├── shard.yml
└── src
    ├── backend.cr
    ├── config.cr
    ├── controllers
    │   ├── auth_controller.cr
    │   ├── storage_controller.cr
    │   ├── user_controller.cr
    │   └── video_controller.cr
    ├── extensions
    │   └── context_extension.cr
    ├── middlewares
    │   └── auth_middleware.cr
    ├── routes.cr
    └── storage
        ├── check_existence.cr
        ├── delete_file.cr
        ├── generate_upload_url.cr
        ├── list_files.cr
        └── upload_url.cr
```

Mainly shards is a dependency tool, and add a middleware to help the authorization by signing a private key in `config.yml`, and routes look like this (kind of like node.js)

```
get "/api/user/:id", &->UserController.get_user(HTTP::Server::Context)
post "/api/auth/signup", &->AuthController.sign_up_user(HTTP::Server::Context)
```

The syntax isn't hard, not that hard to learn from a Node.js background, and ChatGPT knows pretty much of it. Mainly the backend is for interacting with the PostgreSql.

## Trying to Generate the Signature Myself

There is this s3 library for Crystal https://github.com/taylorfinnell/awscr-s3, when I tried to generate a presigned url for the user to upload videos. I don't want the user to upload to the server, instead, I want it to upload directly to the cloud. But the built-in method always generates incorrectly, and there wasn't anything I could do. I tried coding a generation myself with ChatGPT, but it didn't generate correctly either, repeatedly returning the Signature didn't match.

So basically they MAC the date and time with the access secret key for s3, and it was pretty nitty-gritty detailed like whatever thing they need. The boto in python and node.js has built-in generation methods.

I searched another repo https://github.com/iksteen/aws-request-signer and it did generate a key, but the key wasn't working either, probably because it was pretty old and Amazon had like another key signing method.

Mainly because my endpoint is Cloudflare while most of the key generation have endpoints to s3 amazonnews, but I thought like they should both work.

I spent a whole dawn and morning trying to do this and failed, so I gave up and used boto embedded in crystal since crystal can execute Bash.

Still, the presigned url has a limitation of like 5 GB.

## Designing the Frontend React

Since this project is still in Alpha, I just fetched everything from the backend. Since there aren't much in the backend, and there isn't traffic, processing everything in frontend code seems straightforward.

I jumped from Claude Opus to ChatGPT, and the frontend got good enough very quickly. The frontend just includes signup, login, upload, and viewing videos right now, although I plan to add extensive features. The backend isn't mature enough right now

Overall I spent a little over 2 full days of the weekend at home building the crap. It seems good enough for a raw implementation for a frontend, though, and I deployed it to [anony.tube](https://anony.tube/) and [anonytube.jimchen.me](https://anonytube.jimchen.me/).

Cloudflare offers good speed, generally, and there wasn't much problem with uploading and downloading videos, since I am directly communicating with Cloudflare.

Then it's like managing Cors and https, and that is really tiresome, like some requests just won't work in the server's frontend. Anyways like after trying I pretty much enabled all Cors, which isn't good for security but anyways good enough for like normal usage.

I added the token in cookies for expiration over 7 days. I checks if the user have the correct token in cookie on entering the webpage, if they do, they are automatically logged in. Also they are redirected from signin to the webpage if they have credentials.

## More Features to Add

First, I am adding an NSFW detector, since I am aiming for legal hosting. I am also aiming for like no copyright contents or DMCA. I am also hoping to add different resolutions for videos. Anyways, I am pretty tired for now.

## Cost

It's actually surprisingly cheap for a small video platform, as the server cost 5 dollars a month for Linode Nanode, and like storage costs 15 dollars a month for 1 TB, which I probably won't need for now. Cloudflare does most of the job for me.

## About Public Video Platforms

Many video platforms have awfully problematic features and I don't really like them. They try every method possible to stop downloading, only resulting in slower speeds. I also hate the login(and especially hate the fraudulent poping up of forcing me to login). Anyways, these platforms have to comply with local laws, so it's more understandable to have control. But I am aiming for liberty (also within laws) for my platform, mainly hoping to enhance the experience of a guest user. I think another reason might be that they wrote large junky code 10 years ago which are too trash to debug or fix.

There are lots of existing platforms like Peertube and YouPHPTube, but I just want to design one myself for the fun sake of it.

But the problem is probably no one will visit this website, so in the end, it will probably end up like a Dropbox for my personal use. Many people probably like those video platforms anyways, since a determined person who hate those video platforms probably sought for self-host options like me, and I do not consider myself technically advanced or something. So don't believe it when people are complaining, because chances are they actually don't mean it:).

## References

- [Amazon AWS S3 Documentation](https://docs.aws.amazon.com/s3/index.html)
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [DigitalOcean Spaces Documentation](https://docs.digitalocean.com/products/spaces/)
- [Alibaba Cloud Object Storage Service (OSS) Documentation](https://www.alibabacloud.com/help/doc-detail/31827.htm)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Golang Documentation](https://golang.org/doc/)
- [Crystal Language Documentation](https://crystal-lang.org/reference/)
- [Invidious Project](https://github.com/iv-org/invidious)
- [Boto3 Documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Linode Nanode](https://www.linode.com/products/)
- [Peertube Documentation](https://docs.joinpeertube.org/)
- [YouPHPTube Documentation](https://youphptube.com/)
