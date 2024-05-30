---
title: "Booting LineageOS(Finally)"
date: Sat Mar 09 2024 02:01:02
type: phone
---

## Previous Explorations

I hadn't realized, but I documented three unsuccessful journeys with mobile OS.

### Some More Smartphone Exploration

[https://www.jimchen.me/blog/Fri%20Jan%2026%202024%2002:38:01](https://www.jimchen.me/blog/Fri%20Jan%2026%202024%2002:38:01) - the most recent one.

I tried to boot LineageOS for Redmi Note 10 Pro (it's different, lol) on my old Redmi Note 10 5G. My device is called "Camellia," which is kind of stupid. Anyways, I didn't succeed.

I bought a Motorola G54 for around 120 USD after hearing that Motorola has few bloatwares. However, it turns out that the Motorola G54 has plenty of bloatwares and runs its own UI version. The bootloader is quite easy to unlock, but sadly LineageOS doesn't officially support this model, so it's not much different from my old Android anyways.

So last time, I gave up.

### The Unsuccessful and Frustrating Journey of Exploring PinePhone

[https://www.jimchen.me/blog/Thu%20Sep%2028%202023%2000:38:25](https://www.jimchen.me/blog/Thu%20Sep%2028%202023%2000:38:25)

Last year, I tried PinePhone after deciding to switch to open source software. After that, I became fanatic and obsessed with everything FOSS related and ArchLinux. Anyway, the PinePhone quickly stopped functioning and couldn't read the MicroSD card. I still haven't fixed it. Trying PinePhone cost me a lot of time.

### Trying adb, Failed, and Recovering My Computer

[https://www.jimchen.me/blog/Sun%20Sep%2017%202023%2015:29:34](https://www.jimchen.me/blog/Sun%20Sep%2017%202023%2015:29:34)

This is my first attempt, dating as early as mid-September last year. The adb wouldn't run on Ubuntu for no reason, and after asking ChatGPT, it returned a command which I ran and broke my laptop. I tried adb with the Redmi Note 10 the first time, and didn't successfully unlock it.

Anyways, looking back at my journey, smartphones were really hard on me, unlike the exploration of other tech. Archlinux and LFS didn't take much time to set up, and cloud servers are very intuitive to me; I understood everything in a fairly short time.

## How to Install LineageOS

So basically, you need an **unlocked** & **supported** phone. One can install ArchLinux or Ubuntu on practically every laptop device, but mobile is different in terms of architecture.

Actually, there are no official builds for my old phone (Redmi Note 10 5G); to be honest, the phone is nothing but a whole piece of bloatware trash piled together with built-in spyware and censorship.

I was lucky to find this post where a Russian developer released LineageOS for that model:
[https://xdaforums.com/t/rom-13-unofficial-camellia-camellian-lineageos-20-0-with-ota-support-updated-28-01-2024.4618399/](https://xdaforums.com/t/rom-13-unofficial-camellia-camellian-lineageos-20-0-with-ota-support-updated-28-01-2024.4618399/)

There are many unofficial releases for those community-driven open source projects.

I found it surprisingly easy to implement.

Source: [https://m929.ru/](https://m929.ru/)

**How to flash ROM:**

1. Install ROM's recovery using: fastboot flash boot boot.img
2. Boot into recovery In Pixel, adb sideload must be enabled in the apply update section.
3. On your PC with the downloaded ROM, type in the terminal: adb sideload ROM.zip
4. Flash firmware A13; download from mega.nz
5. Wipe data/factory reset

Like basically, after flashing that and wiping the data, I had a working LineageOS!

## Many Types of Phones

I don't get why there are so many phone manufacturers and so many phone brands out there. Moreover, I don't understand why they need to release tens of hundreds of phones every year, literally for the sake of it. I mean, I don't really see a difference between those brands, except for different **default** operating systems and UIs, which I want to customize myself.

I think it's all a commercial joke, this booming market of OS. Today I went into a phone reseller store and asked the price, and they said the cheapest is more than 1000 RMB. It's so crazily expensive compared to other things, especially considering it's a reseller. I mean, I can buy a good-end brand-new phone with 1000 RMB. Then I went into Samsung Galaxy and asked them for these models (that Postmarket OS supports):
Samsung Galaxy A5, Samsung Galaxy E7, Samsung Galaxy S III

They were kind of surprised in finding I want so freaking old phones, and for a moment I couldn't help but burst out laughing. I mean, it was just hilarious.

I seriously don't understand the need to buy the newest phones or update them like three times a year.

## Why I Dislike Defaults

I mainly dislike defaults because of a lack of support for personal customization and their bloatware properties. Still, I am a lazy person, and I don't do extensive Gnome customization or vim scripting. If something is optional and free, actually chances are I would still like to use it. If something is free and proprietary I wouldn't have anything against it. But the problem lies in the multiple bugs and closed source of the operating systems or software that there's just no way to fix for someone not in the company. Sometimes I find a bug I probably want to try to solve on my own. But sometimes with iOS and Google Bugs (like an app won't work), there are just no ways to find the solutions.

## Realizing My Journey These Years

Looking back into my teen years, literally, I have shown strong dislike for smartphones. I didn't have a smartphone my entire middle school career, only inheriting one from my dad in the summer of 2020 when I was going to high school. I hated the idea of a smartphone for as long as I could remember. I wasn't opposed to other tech stuff; like, I used a computer long before that and had my own computer in the 6th grade.

I probably missed adding lots of people to WeChat contacts, looking back. Like literally, I was so ignorant of the existence of WeChat and so arrogant of the whole concept.

I can probably say that most of my new preferences today don't come from nowhere but are like this for many years, except previously either externally controlled, restricted, or just having some gaps that I couldn't cross with limited skills.

I was born different from many people, and I don't want to judge who is better. Different people can have different preferences, none more superior than the others. Yet, I am hoping to maintain mutual respect for people with different digital philosophies.

Even after I had a smartphone, I was much against using it. During the summer before I went to university, I limited my smartphone time to literally 10 minutes every day (only scanning the code when entering a library and around 5 minutes checking my friends' status on Weixin), although once or twice a week I would bypass that, but no more than 1 hour.

After I entered university, I decided it was too distracting, and I didn't use my phone for a whole semester. It was kind of amazing to believe in retrospect, but I really didn't use it for an entire three months at all. I bore the inconvenience and utilized my computer to do all sorts of stuff. The second semester I continued my stance against using smartphones, and couldn't hold on after the COVID pandemic hit. To be honest, if it wasn't for COVID, I would probably keep on not using a smartphone, only there was mandatory testing to be done every day, which is awfully annoying.

People would usually be confused by my statement of not using smartphones, and few would think from my perspective. I can confidently say that not having a smartphone nowadays is just unbearable in China; if you have no WeChat, you can do practically nothing and are no different than a dying old person in terms of living conveniences.

I did that experiment myself and failed. During that time, I remembered the maps and bus routes by heart and went out riding my bicycle (which I later lost). After losing my bicycle, I walked a lot. I watched many movies and YouTube on my computer; indeed, YouTube was one of my main forms of entertainment at that time. I also read a lot, and that was the last period where I remembered myself actually enjoying literature. I can no longer dive into literature. I relied on my parents for much information and kept a daily track of everything to do, every single day. I frequently climbed to the top of the school building to watch the city lights at night. I believed in all sorts of good things. Sometimes, I kind of longed for that kind of mentality at the time. It was actually very sad and had a reverse effect on me.

Also, there was one occasion when my Android phone started beeping for no reason, and then it stopped.

## Downsides of LineageOS and Other Distros?

So LineageOS doesn't have a package manager, which I think is definitely not ideal. But I can use my computer for 90% of tasks.

The other OS that I'm interested in is PostMarket OS (or mobile Alpine). However, it doesn't seem to support WeChat. That's frustrating for me because the main reason I use my smartphone is for WeChat. So if someday, say, I leave Mainland China, then I will probably ditch WeChat and start using that distro.

There is also GrapheneOS, which mainly supports Google Pixel. PinePhone has low specs, and I have had great trouble using it.

## Removing System Apps from LineageOS

```bash
adb shell pm uninstall -k --user 0 org.lineageos.eleven
adb shell pm uninstall -k --user 0 org.lineageos.jelly
adb shell pm uninstall -k --user 0 org.lineageos.etar
adb shell pm uninstall -k --user 0 org.lineageos.audiofx
adb shell pm uninstall -k --user 0 org.lineageos.recorder
adb shell pm uninstall -k --user 0 com.android.calculator2
adb shell pm uninstall -k --user 0 com.android.fmradio
adb shell pm uninstall -k --user 0 com.android.stk
```

## Setting Up LineageOS

Other than that, it's just a few clicks away with adb install for all essential software, and I set up my phone pretty quickly. I'm not against WeChat, but if there's any chance, just any chance, I would probably ditch it.

## References

- [LineageOS Official Website](https://lineageos.org/)
- [ADB (Android Debug Bridge) Documentation](https://developer.android.com/studio/command-line/adb)
- [Motorola Information](https://www.motorola.com/)
- [PinePhone Information](https://www.pine64.org/pinephone/)
- [Redmi Note 10 Pro Information](https://www.mi.com/global/redmi-note-10)
- [XDA Developers - LineageOS for Redmi Note 10 5G](https://xdaforums.com/t/rom-13-unofficial-camellia-camellian-lineageos-20-0-with-ota-support-updated-28-01-2024.4618399/)
- [PostMarketOS Wiki](https://wiki.postmarketos.org/)
- [GrapheneOS Official Website](https://grapheneos.org/)
- [Fastboot Documentation](https://developer.android.com/studio/run/device)
