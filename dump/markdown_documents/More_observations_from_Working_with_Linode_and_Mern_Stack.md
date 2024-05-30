---
title: "More Observations from Working with Linode and Mern Stack"
date: Thu Mar 28 2024 11:10:24
type: web
---


## MongoDB Security
Never leave MongoDB exposed! It will get hacked. Never change the access IP to 0.0.0.0 without configuring a password. Data will be deleted, with only a Bitcoin address left for recovery (which disappeared in 12 hours). More like, don't store anything valuable in the MongoDB database, and hash (or encrypt) everything sensitive.

## SSH Security
Similarly, use strong passwords for SSH.

## DbaaS Latency
DbaaS (Database as a Service) tends to have higher latency, but MongoDB Atlas generally works fine. It reduces the time to maintain the database, and offers backups.(though I can manually backup the database)

## Cloudflare AI Worker
For utilizing Cloudflare AI worker, the Llama model seems really good, quick, and cheap, but the OpenAI Whisper isn't working, keeps saying upstream service error.

## Increasing Temporary Space for PyTorch
For installing PyTorch on CPUs, I need to increase tmp space using `sudo nano /etc/systemd/system/tmp.mount`.

```
[Unit]
Description=Temporary Directory
After=local-fs.target
[Mount]
What=tmpfs
Where=/tmp
Type=tmpfs
Options=mode=1777,size=8G
[Install]
WantedBy=multi-user.target
```

Then 
```
sudo systemctl daemon-reload
sudo systemctl enable tmp.mount
sudo reboot
```

Increase the tmp space.

## Python Script Killed

Use `dmesg` to find the problem.

If it's running out of memory: include the Swap space in Linode. Not a good solution, but enough for scripts running 24/7.

Use separate Linodes for managing the worker and the server, because merging the two might cause the server to become not responsive (could be managed with `cpulimit` but takes lots of time).

## Temp Files in Python

```
temp_dir = tempfile.mkdtemp(dir=os.getcwd())
```
then use shutil to remove it.

## Video Upscaling

Too expensive to run; outdated projects throw an error: No module named 'torchvision.transforms.functional_tensor', and waifu2x upgrading is not that good. It's slightly better than original, but far from native 4k videos (blurry in previously clear parts like black and white stripes). Using `lanczos` is far less good .

Face upgrading seems ok, but it only offers face enhancement. More akin to Web Glow.

## Environment Problems

Use  a `builduser` and `yay`, you can remove the password (set `emptypasswordssh` to no). Then use that user to install things with `yay`, and for Python libraries: either install with `yay` (sometimes takes a long time compiling) or simply use `venv`.

I like Arch Linux because it's DIY, and any problems comes from the user. Ubuntu packages need to be compiled/downloaded at an up-to-date version to work.

## Claude vs GPT

GPT seems to be getting nerfed and becomes lazy with coding. Claude opus/sonnet much better.

## Nginx

Increase  `maxhashsize` to 4096, and give permissions (or use a specific user, in my case `builduser`), or else visiting the webpage will result in a 500 error. Arch Linux doesn't have `nginx` nor `www-data` user by default.

## Translation Tools

There are many translation tools available, including Google-t5, Facebook's NLLB Distilled, Helsinki NLP, etc. Just download the model from Hugging Face, then use Transformers, and it runs pretty smoothly when translating VTT files. But it still takes a really long time. Then there's Argos Translate and CTranslate built on OpenNMT models.

## Speed Comparison

Laptops are by far much worse in terms of CPU performance compared with cloud servers. My laptop, though high-end, takes about the same time to process a video as an 8 GB Linode with 4 CPUs (it's not utilizing all 16 CPUs on my laptop, but you get the idea). Cloud servers also offer much faster internet speed.

## Running Costs

Running a GPU constantly is way too expensive for me; the prices range from 0.2-5 dollars an hour. Even a single-core, very low-end 0.2 dollar/hour GPU, typically RTX 3000 or 4000 series, costs like 150 dollars a month. I kind of understand why these websites want to charge people money—they have all those running GPUs in the background. The raw costs and maintaining them are really expensive, and like, you have to have much more available than the normal workload. Those companies don't turn on and turn off those GPUs like I do when I was doing homework for customers, though, because it has to be readily available.

Then there are 3rd party API services, like Whisper APIs. But those are still very expensive. Transcribing an hour of audio costs around 0.2 dollars. Comparably much cheaper than freaking Veed Premium, which is like 20 dollars a month to use for like 100 minutes of transcription services! Those commercial companies wrap everything up in fancy frontend frameworks, and you never know how expensive they charge!

## Transcribing services

Running OpenAI Whisper on CPU is so slow! It goes on forever for transcribing 30 seconds. It's just very, very slow and my computer's fan was complaining all the time.

Distilled Whisper doesn't support other languages, only English. I was like: I don't need to transcribe English, I can hear words clearly no matter.

So I chose Faster-Whisper, which is much faster, and generally accurate enough for me.

There's also "Insanely Fast Whisper," except it's not available on CPU. I have no idea, since like the point of quantization is for models to run on fewer resources.

To be honest, strangely Whisper sometimes doesn't catch one word in a song, but Faster Whisper does well with songs.

Linode 8GB costs $0.072 an hour, and running Faster-Whisper on it for an hour can transcribe about a 2-hour video, which is much cheaper than the API services, although one might argue it's not that scalable. Given 100 hours of audio, it takes that long to translate on Linode, but with one click of an API (since it's designed to scale), you can produce the results. It's probably 10 times cheaper than the third-party stuff, but, I don't think the third-party companies did quantization, though.

There's also Dropbox which offers free transcribing for uploaded videos, not that I like Dropbox or something. In fact, there are so many of those companies offering nowadays, like YouTube's default transcription(which is weird and I still haven't figured it out, sometimes it is good other times it is disabled, and very bad).

## React Theme

There is a Dark Reader npm library to implement different themes and it's extremely easy and popular! I wished I had used that instead of manually implementing a dark theme with React's context api for my personal website before. 

But the iframe was a big trouble. Actually it's my first time implementing iframes so like they are a big headache. Passing props to the iframe page doesn't work to iframes on a page, and I tried about 2 hours to manipulate the iframe with previous methods and failed. Then I used the send message api and it worked good, just basically send a message to the iframe, and let it handle the message and toggle the theme.

## Conclusion

Self-hosting is awfully addictive and fun, aiming to get rid of "necessary" proprietary commerical bloated platforms. But it's kinda limited as well, and maintaining cost real lot of efforts. For example, the bugs of in frontend react is a constant headache(actually I hate frontend now). I can enjoy videos with subtitles and watch them anywhere.

## References

- [MongoDB Security Best Practices](https://www.mongodb.com/security)
- [Linode Documentation](https://www.linode.com/docs/)
- [Waifu2x](https://github.com/nagadomi/waifu2x)
- [Nginx Configuration](https://wiki.archlinux.org/title/nginx/)
- [CTranslate2](https://github.com/OpenNMT/CTranslate2)
- [Whisper by OpenAI](https://github.com/openai/whisper)
- [Faster Whisper](https://github.com/guillaumekln/faster-whisper)
- [Dark Reader](https://darkreader.org/)
