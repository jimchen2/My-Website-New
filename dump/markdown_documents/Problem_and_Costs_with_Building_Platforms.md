---
title: "Problems and Costs with Building Platforms"
date: Wed Apr 03 2024 01:00:01
type: web
---

## Few Activities

So I think the main problem here, inarguably, is that after building a platform there aren't any people. My video platform tubeapp.org only has me in it. Even if you got people signing up, chances are they aren't going to stay long.

Unlike popular platforms like YouTube, Bilibili, and Instagram, where many people visit on a daily basis, it's extremely hard to attract a reasonable amount of regular visitors (unless you host a copyright adult video website for free, like "noodlemagazine" or "videosection," which is obviously against my morals). People just don't visit your website.

## So Why Not Go Back to Popular Platforms?

There are multiple reasons, and I thought I already stated them clearly, but just to clarify once again:

- Lack of customization

I don't get to customize the homepage with HTML and CSS! Someone designed the ugly crap! I don't get to customize my contents! I have to follow its term of service, which makes me very uncomfortable.

- Proprietary

I don't have any idea what's going on in the backend! I run into an error in the platform, then there is no solution at all, which makes me panic! Imagine having a bug and not being able to debug it, and the only way is to beg a proprietary company's programmers to solve it for you! If it's open source, there would be open APIs and customizable client sides for users.

There isn't an API to upload stuff (or upload stuff from MongoDB or whatever, for that matter). I must crawl my way through a proprietary buggy web interface daily only to upload and engage in discussions, ahh, so hard.

There are lots of bugs (don't say there aren't bugs!) For example, Bilibili's uploading speed is capped, and the file for subtitles is buggy, etc.

- Vulgar eye-catching stuff

There are many of those tech channels with a million subscribers that are not technical and even "misleading" at times (or most of the time very misleading), and the fact is that they get lots of views!

Popular channels on YouTube include "NetworkChuck" and "LinusTechTips" (actually some folk with the same last name), and they offer no depth in terms of knowledge, only eye-catching simple stuff. I used to be interested in them one year ago, no more now, they are simply too shallow.

These people probably earn lots of money and are doing it full time. Many comments down there are, in fact, even more misleading. (and that is on YouTube, not on Chinese platforms where almost nobody understands tech) For example, they compare distros based on desktop environments (I mean, what the heck?? You can literally customize the desktop environment to be anything you want!)

- Few views/comments as well

Yeah, like I once opened a Bilibili account and posted programming content to it, tends to get around 50 views with no comments at all, which is sad.

- Privacy Concerns

As we all know, privacy is a huge concern, especially for these video platforms. You use a phone number to register, and those Chinese platforms practically know who you are. They aren't E2E encrypted, and everything is public in China. So every word you say links to you, the real person, on Chinese platforms (it's not necessarily always that bad, just a reminder not to say anything improper, or Winnie would jail you!).

- No Rights for Users

Some platforms have absolutely no rights for unsigned-in users, like Twitter, Instagram, or Bilibili. Without an account, you can't view or see other people's posts. They even restrict those privacy frontends like Invidious and Nitter (dead) and Bibliogram (also dead).

- Requires "Clever" Javascript Tricks

Some platforms have those strange frontend tricks that allow you to do certain stuff (but not all), without logging in or something. Like switching to mobile sites on browser console or copying the address then visiting. Or freaking Apple phone playing video without full screen: by clicking the pop-out then when it pops out click the pop in again, then you can watch videos in freaking crap safari without having to go full screen. These clever tricks, although easy to learn, are dangerous to rely on because they are very misleading.

- Poor Performance

Don't use the argument "It is a global and popular video platform, so it must have good performances." Wrong!

![YouTube Lighthouse](https://blog.jimchen.me/Screenshot%20from%202024-04-03%2001-25-31.png)

![Bilibili Lighthouse](https://blog.jimchen.me/Screenshot%20from%202024-04-03%2001-29-37.png)
![Instagram Lighthouse](https://blog.jimchen.me/Screenshot%20from%202024-04-03%2001-35-23.png)

Maybe a person doesn't want 3rd party plugins or those cookie sessions, and wants a faster load. The point is these platforms treat users like dumb idiots without giving them options. It has great power over its users, powers that it shouldn't have in the first place.

My Vanilla implemented video platform (without preview image cap and CDN or addressing any SQL/caching issues):

![My Platform Lighthouse](https://blog.jimchen.me/Screenshot%20from%202024-04-03%2001-42-19.png)

## Conclusion of Popular Platforms

So like, there are lots of users there, so occasionally going there for looking at user's comments is ok. Sometimes I am not looking for the video itself but looking for the comments on the video to get a general idea, or just for fun.

Compared with only one YouTube, there are thousands of instances of Peertube (that is public), and Mastodon instances.

So yeah, we won't talk about it anymore, and I don't compromise with current popular social media. If I don't have views, fine, but it's better than having no power.

## Cloudflare

When uploading a video to Cloudflare S3, it takes a while for the video to load smoothly. When I first upload to it, I couldn't fully utilize the Internet connection speed in Hong Kong, but the speed is good enough in the UK. It takes like half a day before I could watch the video easily from everywhere in the world.

## Lower Costs?

So Akamai is actually not a cheap company (although it isn't expensive either). I found there is this cheap VPS hosting called Hetzner, which builds its own servers. It offers 3 AMD CPU, 4GB RAM, 80GB disk space at 8 USD/month, which is super cheap. It is like about one half the price of Linode. But I've used Linode for a long time and it works fine though.

So by optimization, I can achieve the same performance with costs cut in half, but I am content with these platforms at the moment, I am also kind of lazy, and I don't want to switch.

The German company Hetzner is super cheap, about half the price of Linode, offering 40 GB disk and 4 GB ram at 4 dollars a month. It's also been around for a long time, since 1997. But Hetzner mainly operates in Europe, and I really like Linode. There is no reason for me to migrate anyway. I thought like migrating would save me about 20 dollars a month, but then again like everything is so costly. Subscribing to Poe or GPT for a month is 20 dollars, and eating a dinner is sometimes 20 dollars. It is just not worthy to save every penny.

## Lack of Utilization

I put the background worker on a separate Linode with 8 GB ram, but it relaxes 90% of the time(since my website doesn't have many videos, and it's only me right now), so it is not utilizing enough of the machine. But it can't run smoothly on lower ends Linodes though. I guess that I just have to leave it be like this. Speaking of costs if I store like 5 TB object storage that will cost about 100 dollars in popular platforms like AWS or Google Cloud, so like this isn't very significant.

## Backing Up S3 Storage

Suppose the cloud data center got a fire, then the data will be lost. Obviously the chances is very very low, but such things do occur in history. So backing it up through 2 services is a good idea. 

Backblaze B2 is very cheap so I back everything up from Cloudflare S3 to Backblaze B2 with boto3.

Speaking of Object Storage, there is Backblaze B2 which is super cheap, offering at 6 USD/TB. Backblaze is a company that is "solely for storage purposes, not like AWS which uses its S3 to fund other projects".

And I can also buy a server at home, except that well, I don't want to manage the hardware full-time, and I pull the electricity sometimes.

Blackblaze B2 is 3 times cheaper than AWS or Akamai object storage.


## References

- [Cloudflare R2](https://www.cloudflare.com/products/r2/)
- [Akamai Linode](https://www.linode.com/)
- [Hetzner](https://www.hetzner.com/)
- [Backblaze B2](https://www.backblaze.com/b2/cloud-storage.html)
- [PeerTube](https://joinpeertube.org/)
- [Mastodon](https://joinmastodon.org/)
