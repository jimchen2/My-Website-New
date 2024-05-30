---
title: "Misconcepts in Web Development"
date: Sun Mar 03 2024 07:42:23
type: web
---
## Development vs Production

For example, in React, use `sudo npm start` to start the web server, but
actually running in production compiles the code into static HTMLs in a
build directory.

## Use of Nginx

Using Nginx effectively sets up a reverse proxy, so there is no need for
separate machines for different addresses. There is no need for separate
frontend and backend Linodes, just set up a reverse proxy to proxy to
the backend from a specific route.

## Systemctl Jobs

Actually, setting up nginx.conf to point to the frontend build directory
effectively starts the website, so there is no need for a systemctl job
to keep running `npm start` or whatever.

## Object Storage (S3) vs Volumes

S3 storage is popular for large file storing (e.g., video hosting),
while volumes are SSDs along with the operating system. Space on the
operating system is expensive, costing about 0.1 dollar a month for 1
GB. While object storage like Cloudflare R2 is \$0.015 / GB-month. So,
it's more scalable to host media in Object Storage than locally, while
Object Storage might be slower to access, utilizing a built-in CDN
solves the problem.

## SaaS

Some popular SaaS services include MongoDB.

MongoDB Official website bans Russian IPs, claiming to support Ukraine.
There are also other MongoDB providers like Digital Ocean. There is even
service for MongoDB in Yandex, though.

Anyways, MongoDB is open source and can be run locally. The official
website only provides a more stable and scalable option, and just
setting up MongoDB from yay and connecting to it in Node.js is
straightforward.

## Some Preferences

No GUI, GUI messes things up.

Set up server and run programs myself. First, it is akin to my local
Arch Linux environment, and shouldn't be that hard. Secondly, using
third-party tools messes things up, and third-party GUI tools so-called
panels are especially confusing and misleading, making it impossible to
debug and control.

Less payment, since excessive paying is useless.

Fewer external tools/platforms. These mess things up. Especially
proprietary and commercial companies. Google transferred its domain
names to Squarespace, which is weird. So, I transferred all domains to
Cloudflare.

## References

- [AWS S3 Pricing](https://aws.amazon.com/s3/pricing/)
- [Cloudflare R2 Pricing](https://www.cloudflare.com/products/r2/)
- [Nginx Configuration](https://wiki.archlinux.org/title/nginx/)


