---
title: "Self Hosting Options"
date: Sun Mar 03 2024 08:02:43
type: web
---
Recently, the idea of self-hosting fascinates me. This is because I find
I can self-host pretty much all websites easily, including forums, video
platforms, blogs. The only thing is the cost, which, actually isn't that
much if hosting small instances.

For example, purchasing 1 TB of object storage is only 15 dollars one
month on Cloudflare R2. Akamai Linode offers this at 20 dollars a month
for 1 TB object storage. AWS offers similar pricing around 10 dollars to
20 dollars (it has so many S3 models). Notably, Dropbox even has a
cheaper price of \$9.99 a month for 2 TB. There are also cheaper object
storages out there, except their performance and stability are not
known. But Dropbox is proprietary, and I have no idea what's going on,
and Dropbox points my files to other files in the cloud with the same
Hash values, and Dropbox GUI can sometimes be unresponsive, which is
annoying. Actually, performance speaking from my experience, Dropbox
performs much better and is fully utilizing the network speed. However,
using various tools like rclone and s3fs for like Akamai Linode or AWS
is slower. Actually, I think it is because I am not fully utilizing
these tools, though.

When I was a child, I didn't really know and think about such things,
with evil Windows OS making everything foreign and mysterious for me. I
didn't know what was going on in those websites, and that made me
succumb to them. But over-relying is not a good practice, and I shall
learn to be independent and strong. That is what I dislike about Chinese
tech companies, and also some Google and Microsoft services. They do
create awesome available services, only for the individual to be used at
the cost of losing one's own mind and freedom in the digital Internet.

But self-hosting has a main challenge, which is probably people won't
notice the website. I don't know why, but people seem awfully glued to
popular platforms like Twitter, Instagram, and Bilibili and WeChat in
China. The sort of over-reliance on manipulating, proprietary, and buggy
apps makes me feel uncomfortable. It is this discomfort that drives the
urge to go self-host, yet it is also this situation that an awesome app
will probably be ignored before it's dead. My website has few unique
visitors and few comments so far. I don't know why people are so
reluctant to leave comments anonymously, though. Perhaps it's because
the total visitor is too small.

It runs in the human mind---that they want to stick to one thing, the
thing they are familiar with, all their lives, especially Chinese
people. Many people choose inconvenient and trash platforms themselves,
while complaining about it constantly without the urge to switch. The
number of people doing this is too large, in fact, I find this behavior
quite hard to comprehend. It is like having luxurious goods, and a
low-end bed, and always complaining how bad the bed is while not willing
to change. There are better platforms out there, and anyone nowadays can
host one by buying cheap cloud storage. I think like Linode Nanode 5
dollars a month is pretty much enough to host a small forum for
discussion or something related. Don't say how much expertise it takes
because, as a bottom student in the department of computer science, I am
picking it up from raw only after less than half a year. Hosting a forum
like Discourse shouldn't be that hard. The main thing here is
customization, and by customizing everything to suit my own needs, it is
definitely better than the proprietary and fixed, not flexible
platforms.

## Invidious/Piped

There are loads of instances out there, and the one I use most
frequently is yewtu.be. Invidious doesn't store videos on its own
servers; it traffics the YouTube videos.

## Forums

Simply using the MERN stack to write a forum won't take that long, at
most in 1 week. There are also mature hosting services like Discourse
forums. Anyways, they have their pros and cons. Writing one myself is
better tailored to my preferences, while using the pre-built apps is
easier and saves less hassle.

Also, there is Mastodon, which is like a Twitter alternative. Nitter
stopped functioning, so that probably died. But there are lots of other
small forums good for a niche community.

## Video-Hosting

There are lots of video hosting platforms out there, thousands of
millions, judging by the large amounts of adult websites. Using Peertube
or MediaCMS or YouPHPTube are some mature hosting platforms, but they
require login to post videos by default. Anyways, raw coding is quite
easy with the MERN stack and object storage.

## Security

Mainly when hosting, I would want to maintain the confidentiality and
integrity of the user's data. But if it is like a public platform, this
isn't really that important since anyone can access the information

## References

- [Cloudflare R2 Pricing](https://www.cloudflare.com/products/r2/)
- [Akamai Linode Object Storage](https://www.linode.com/products/object-storage/)
- [AWS S3 Pricing](https://aws.amazon.com/s3/pricing/)
- [Dropbox Plans](https://www.dropbox.com/plans)
- [Rclone Documentation](https://rclone.org/docs/)
- [S3FS Documentation](https://github.com/s3fs-fuse/s3fs-fuse)
- [Discourse](https://www.discourse.org/)
- [Invidious](https://invidious.io/)
- [Piped](https://piped.video/)
- [Mastodon](https://joinmastodon.org/)
- [PeerTube](https://joinpeertube.org/)
- [MediaCMS](https://mediacms.io/)
- [YouPHPTube](https://www.youphptube.com/)
