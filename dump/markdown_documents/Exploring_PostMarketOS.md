---
title: "Booting PostMarketOS"
date: Wed Apr 10 2024 19:36:45
type: phone
---

## Why?

After getting rid of the crappy UI and installing LineageOS on my Redmi Phone (https://www.jimchen.me/blog/Sat%20Mar%2009%202024%2002:01:02), I was still not satisfied. Mainly because I am using WeChat too frequently, and it is kinda addictive and time-wasting. Those apps eat away at me and gradually I become dependent on the mobile phone, glued to it occasionally. Eventually, I decided that carrying WeChat with me everywhere is just too distracting.

Furthermore, LineageOS doesn't offer as much control as Linux does. I mean, it does offer more control than iPhone or many Android phones with those crappy UIs, but it is more or less based on Android, and I am not that familiar with it.

With digital freedom and being liberal in mind, I began to explore PostMarketOS.

## Jailbreaking iPhone Crash

I tried to jailbreak the iPhone after running a script, but unfortunately, after that, my iPhone no longer boots, so I don't know what to do with it other than letting it rot.

## Buying OnePlus 6

Among the many devices supported by PostMarketOS, OnePlus 6 is a very accessible and modern choice, released in 2018. I hadn't realized that it was 6 years old though. Other devices like Nokia N900 have only 256 MB RAM, and the Samsung Phones were released in like 2013 or 2014. Anyways, I bought OnePlus 6 for 490 RMB (70 USD) from an online retailer store and began exploring.

## Flashing the ROM

Everything is very easy and straightforward; unlock the bootloader, then flash 2 images, and I am done.

## Desktop Environment

There are Phosh, Plasma Mobile, Gnome Mobile, and SXMO.

SXMO doesn't really have a UI; it's more like i3, managing everything from a dropdown menu.

Phosh and Gnome Mobile are pretty alike. Phosh was the mobile version for GNOME, but there are some small differences. They come with the same software shipped.

The wiki (https://wiki.postmarketos.org/) has most things anyway.

## About Gnome Problems

Overflow: It is kind of working in GNOME with all windows very small.

- Overflowing:

  - Nautilus is overflowing
  - Chromium is overflowing
  - Firefox Works, but some website overflows due to useragent being a computer(still overflows when I set useragent to mobile), My 2 websites, `jimchen.me` and `anonytube.jimchen.me` works well though, since I am determining the fonts based on the window innerWidth.

- Doesn't natively support Chinese characters.(Plasma Mobile does, but its even more breakable)
- Needs manually switch between Headphones and Speakers: Kinda harder
- Rebooting error due to hardware problems, sometimes running into Snapdragon Coredump
- Screen not auto-closing
- Doesn't support many appimages(have to configure Clash manually)
- Need to re-login on every screen close, and it was configured to accept 6 numbers (sometimes buggy if the password contains other things), thus the user password needs to be 6 numbers, else it got very buggy on login
- Camera not working on OnePlus 6 and OnePlus 6T
- Cannot tweak. I tried tweaking the font and it broke the user interface. It is easily breakable, if I tweak the phone becomes unusable
- Cannot receive calls (can initiate calls and receive messages)

These are mostly kinda small problems and can be solved by scripts, except the last problem receiving calls, which makes it not usable than a daily driver. Even a senior citizen easy phone can do calling with no problems.

The driver isn't waking up in PostMarketOS, and in the community version Droidian they ship some android drivers to make it work.

## About SXMO

SXMO is like swm for phones. It is so snappy and build all with scripts(there are those hooks for calling, for receiving messages, etc). It is really really cool and builds upon a text based menu, and everything is customizable(instead it is more like someone's customized scripts rather than a well-established DE) I can run qutebrowser on it, and it features a really cool keyboard where you control everything on the screen(like etc, and those vim bindings). It even use vim to send messages as default! I was like, wow.

Like when I tried to navigate around the menu I can easily know the cli commands to get those stuff, like connecting to wifi or whatever. It is literally navigating through the terminal with a cli interface.

## Customization

### SSH

Run `sudo rc-service sshd start` for computer to sshd into it.
From usb: `ssh user@172.16.42.1`, else run ifconfig and get the ip address.

### Installing Stuff

Using gnome-mobile, there are many preinstalled apps that are unnecessary, and I also need some stuff, after connecting to wifi, I run these commands to customize it a little bit

```
cd ~ && rm -rf Desktop Downloads Pictures Templates Documents Music Public Videos
sudo rc-update add sshd default
sudo sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
sudo apk del firefox-esr lollypop loupe gnome-clocks postmarketos-tweaks  gnome-contacts karlender portfolio gnome-software gnome-calculator postmarketos-welcome gnome-text-editor && sudo apk update && sudo apk upgrade &&  sudo apk add bash curl nano vim firefox git net-tools ranger
```

## Full Disk Space

As we all know, Alpine Linux is lightweight, and added together it was around 2.3 GB

```
Filesystem                Size      Used Available Use% Mounted on
dev                      10.0M         0     10.0M   0% /dev
run                       3.7G      2.2M      3.7G   0% /run
/dev/mapper/userdata2
                        108.7G      2.3G    100.9G   2% /
/dev/mapper/userdata1
                        221.1M     60.2M    149.1M  29% /boot
shm                       3.7G         0      3.7G   0% /dev/shm
tmpfs                   756.0M     20.0K    756.0M   0% /run/user/10000
```

## Configuring Clash

So before that I used Clash-verge in Linux(a frontend gui for clash that works fine). There is also Clash for Android. But like the gui isn't working well in PostmarketOS, so as an example to program it from command line, add a `test.yml`

```
proxies:
  - name: "Server1"
    type: ss
    server: bff6ce3.gxtewt.lol
    port: "43748"
    cipher: aes-128-gcm
    password: [YOURPASSWORD]
  - name: "Server2"
    type: ss
    server: bff6ce3.gxtewt.lol
    port: "43641"
    cipher: aes-128-gcm
    password:  [YOURPASSWORD]
mode: Global
external-controller: '0.0.0.0:9090'
port: 7890  # HTTP proxy port
socks-port: 7891  # SOCKS5 proxy port
```

Then get the file `Country.mmdb` and put it in current dir.

```
$ clash -d . -f test.yml
INFO[0000] inbound http://127.0.0.1:7890 create success.
INFO[0000] inbound socks://127.0.0.1:7891 create success.
INFO[0000] RESTful API listening at: [::]:9090
```

Using the api

```
$ curl http://localhost:9090/proxies/GLOBAL
{"alive":true,"all":["DIRECT","REJECT","Server1","Server2"],"history":[],"name":"GLOBAL","now":"Server2","type":"Selector","udp":false}
$ curl -X PUT -H "Content-Type: application/json" -d '{"name": "Server1"}' http://localhost:9090/proxies/GLOBAL
$ curl http://localhost:9090/proxies/GLOBAL
{"alive":true,"all":["DIRECT","REJECT","Server1","Server2"],"history":[],"name":"GLOBAL","now":"Server1","type":"Selector","udp":false}
```

OnePlus 6 doesn't work with calling functionality. I bought OnePlus 6 fajitta, in hope that it will work with calls. I was still eager not to give up. It said on the Postmarket OS wiki that fajita's calling is working.

## Flashing Mobian

So I decided to first try mobian.

The process is very straightforward, just go to fastboot and flash the boot and userdata image to it and that's pretty much it. Mobian was running with Phosh, and it was pretty cool.

However, the calling function isn't working, and I cannot receive calls.

## Trying PostMarketOS again

Anyways, I tried PMOS again, but it still doesn't work with receiving calls(like OnePlus 6 and OnePlus 6t are pretty similar, why should I expect OnePlus 6t to work with calling? Lol).

## Device got Bricked

Then I got kind of sad and tried to erase some partitions with fastboot, however, in flashing, I erased a critical partition accidentally with fastboot, and my device got bricked and stuck in a bootloop. 

So I went to get the stock firmware and payload dumper(on github), and extracted the images. Basically run `fastboot getvar all
`, and see which specs of the phone and which slot is active. So flash to the inactive slot and then switch. I made the mistake of flashing to different slots multiple times.

Anyway, I flashed them to the phone with fastboot, then rebooted, and everything works smoothly, and I was able to recover back to Android. It went to crashdump mode a few times, but overall it's not that hard. I thought I was in great trouble, turned out everything worked fine.

Then I flashed PostMarketOS again and it was fine(without calling).

## Washing the Phone

So the phone is second-handed and very dirty, and I tried to wash it, but after washing the phone fastboot devices could no longer detect the phone(I don't know if it is relevant, just suspecting). USB ssh still works so it's really weird, like I go to fastboot mode and it wasn't even detecting anything, lol. I don't know any other ways to flash or whatever.

After a while(I think like 2 hours or so), I went back and tried fastboot and it worked miraculously.


## What's Good about PostMarketOS?

It gives users full control, including but not limited to (I observed these):

- Browser behaves like a computer, so if you switch tabs, brower videos play in the background. It can be a miniserver, kind of like a Raspberry Pi without those pins and controls
- Have a native console. Ahh,, the amount of power and control I feel with the cli, like literally the phone is under my control. I can also ssh easily, and problems can be fixed much faster.
- Package Manager!!! Like honestly, I would die for a package manager (although this means limited software anyways, like only those working in Linux, like no shitty WeChat, lol). There is Fdroid on Android that's mostly FOSS software and it's pretty good too(It includes link to the source code and you can update it easily)
- Native Linux env: I am most familiar with Linux and not familiar with proprietary environments
- Good Desktop Environment! Like you can install different DE, so no monopoly is at place. At least Gnome, dwm(sxmo), and Plasma work to some extent on PostMarketOS, so like you can choose which desktop environment you want instead of being stuck with something the company provides. I am not specifically saying the DE the company provides is bad or something, just choices make one happier(given choices I might still choose the default, but I will probably feel more contented).
- Debloated. Honestly a phone doesn't need or consume that much space as much as 128 GB. My computer doesn't need that much SSD unless running some machine learning models locally. A fresh install is only around 2 GB, and it is with Gnome(which is considered a heavy DE). Honestly among the well supported distros Alpine is the lightest.

## Is PostMarketOS a SmartPhone?

Of course it is, except it is more aligned with the functions of computer than phone. It is kind of like a Rasp Pi but with calling and messaging functions.

And also, the OnePlus is a smartphone, so it should be a smartphone. Whether a phone is smart shall be categorized be the kind of phone it is, not by the kind of operating systems.

Also it can browser web like on computer, so I do think it is a smartphone. It is only uncompatible with apks and App store.

## About People's Opinions

It's a person's freedom to think I am weird and don't like my ideas, but I think the same too about others though. Mobile Linux has a far smaller market than laptop Linux(although Android in build upon Linux core), so probably very very few people would comprehend. I think most people have far more resilience to WeChat or similar apps than I do. In fact, I am easily addicted and distracted by many of those apps, sometimes leading me to not doing anything all day long, so I must forcibly separate myself from those apps to ensure my mental wellbeing. People don't seem to understand that since they have resilience and self-control(which I seriously lack in). I also have the freedom to dislike other products with adequate reasons.

## What's Next?

The disk is 128 GB so I can store lots of 4k movies in it to watch offline. The whole working system is less than 4 GB now. It will probably gets larger, but with Alpine Linux it's just trivial to the whole disk.

I have no idea why people run out of disk space. Just delete the freaking bloatwares and everything would be working fine. Like to be honest without running Pytorch, 30 GB is enough for the whole computer or mobile with wise management(size of smaller sized SD card).

I will still need WeChat now and then, just not on a daily basis. For example, when like going to the hospital or doing certain things...

WeChat is a mandatory software nowadays in China, if it isn't required I will delete WeChat.

Sometimes when I need to call a Taxi the AMap and BaiduMap works good in LineageOS, but I can try not to call taxi altogether. It's not that much of a discomfort, just manage time more wisely.

Which obviously brings me nostalgia again back to the summer of 2018 when I didn't have a smartphone yet(I kind of wished I never need to use one now), when I went to Pudong Gaoqiao Riverside Forest Park alone in a bus with my old "Philip" phone(for elders). I waited for the bus (it only came every 50 minutes) after taking the subway forever, but fortunately the bus came around 20 minutes, and when I tried to return home the bus came very quickly.

Despite the inconvenience, I had less on my mind and had so much fun. I used to walk around and enjoy everything with a light-weighted heart, and look at the vast sea like nothing else mattered.

I remembered on that day I had 200 RMB(a lot to me at the time), and went all alone, and I thought that I would have went there much easier if I could call taxi after exiting the subway station. But being free of smartphone trap gives a unique sense of joy and freedom to the mind.

## References

- [PostMarketOS Wiki](https://wiki.postmarketos.org/)
- [OnePlus 6 PostMarketOS Guide](https://wiki.postmarketos.org/wiki/OnePlus_6_(oneplus-enchilada))
- [Mobian Documentation](https://wiki.mobian-project.org/)
- [Fastboot Documentation](https://developer.android.com/studio/run/device)
