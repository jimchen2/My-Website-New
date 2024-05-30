---
title: "Exploring BSD: Incompatible Wireless Card"
date: Tue Apr 09 2024 12:50:00
type: other
---

## Incompatibility 

Today I decided to play around with the BSD distros. I have used many Linux distros and found they are pretty much alike, no big difference anyways except for package managers. Anyways, I hopped on to the FreeBSD website and flashed the ISO to my usb.

BSD distros are pretty much like Linux in the application level, they can also run Gnome or Kde Plasma or whatever, pretty much everything Linux runs. 

I installed the FreeBSD distro but there was a wifi card problem, and there was just no way to solve it. On researching I found my old laptop, which is Honor Magicbook, has this `RTL8822CE 802.11ac` as its wireless card, and I can't get it to work correctly in FreeBSD.

It was very frustrating and I tried `wpa_supplicant` many times, all failing. `ifconfig` couldn't detect the `wlan0`.

Then I installed GhostBSD with Mate as DE because it was too frustrating working in that headless environment and it turns out this problem still couldn't be solved. I tried connecting via the graphic Interface, and it failed. Another reminder that graphic interface is more or less useless--you either solve it or you don't.

Then I tried to use `wpa_supplicant` again, it complained about "ioctl 80221" and stuff. When rebooted I could see both `wlan0` and `eth0` with `ifconfig` but when I try `service netif restart`, it would destroy the `wlan0` interface.

I think the main issue lives within the driver for the card. So in the meantime changing the card seem to be a good idea to experiment.

## Changing the Realtek Card

So off I went around all around Hefei for computer repairing stores. My laptop is a Honor Magicbook. First I hopped on the bus to HongGang, just several kilometers down the road. I went there and there was a Honor store, however, they say they can't fix it. 

I went to JingDong computer repairing store, and there was a man sitting inside a room playing his mobile phone. I went in and asked and they said there wasn't a wireless card available, and that my system is "weird", they never seen anything like it before, obviously not knowing anything about it. The man tried to insert a usb drive for wifi, but it didn't work, and he frowned from the start to the end looking at Mate Desktop. I asked further and they said I would need to buy the card myself and it would need 80 RMB to fix it with my card.

Then I went to the Honor after-sales service store, and they looked very annoyed after seeing my laptop, claiming they never seen such systems and they could only fix and repair with their "official systems", which of course is crappy Windows. The man said "you probably know what you are doing and more than me". Anyways, there wasn't much I could get out of them. I tried to ask if they would replace my wireless card but they refused, saying they could only give me their wireless card(rtw880).

Anyways, then I eat at a KFC, and hopped on another bus, going to another computer repair store， just north of National Defense Technology University. There was 3 person in it, and when I asked if they could repair the computer for me they replied yes, but they couldn't solve the problem, claiming they never saw the system and it was beyond their knowledge. Anyways, I asked if they could change the hardware stuff and they said they don't have a wireless card available, and I need to buy one, and offered 50 RMB to change it. Then I got out.

I tried walking to the fourth computer repair store, which has "computer assembling" in its name. It is around little less than a kilometer. But I walked there it was among torn-down houses, and the store is closed, and around me there was a million stalls selling all kinds of street foods, so much it almost blocked the road. People were having fun eating and talking to each other around me.

Then I was very frustrated. I got on line 2 and went to Sanxiaokou station, and I went to another computer repair store called Didi repair. It was on floor 13 on a building. I went up and called the person, and he said he would come in 5 minutes. Anyways it is mainly a door-to-door service. I went in and showed him the wireless card problem, and he was kind of amazed and said he hadn't seen the system either. I told him it was BSD, and showed an article saying FreeBSD is amazing! Anyway, the man seemed very enthusiastic and easy-going, and offered to change the hardware for me. He is very friendly and we chatted a while, he saying that people are too impetuous nowadays. I expressed my strong interest in computer systems(or just playing, anyway). 

After that he got the tools, and he said he had an Intel Wireless Card from a computer from the 2010s, and he offered to fix it for me. He opened the Honor Magicbook and switched the Intel into it to replace to Realtech card.

He asked if I use Linux, and I said I used Linux as a daily driver. He said the repairing technicans are mainly vocational school grads, and doesn't know much about systems. He seemed very interested in command line operations and watched me as I stumbled around with `vi`. I edited the `/etc/rc.conf` and changed the `/etc/resolv.conf` and restarted the network. Then I edited the `wifi.conf` to be the network wifi of his office. I was very clumsly in the new system because I have been using Linux pretty much all the time and I was very clumsy with `vi`. I was always typing `nano`, `gedit`, `systemctl`, `journalctl` or commands like that from my muscle memory. Anyways after a long stumble I finally configured the `wpa_supplicant` to connect to wifi, and got an ipv4 with `dhclient`, then opened firefox, and I could go on websites!

I was pretty overjoyed and satisfied with the journey, and I thanked the man and paid 800 RMB. He said I am welcome to hang around at other times. I find this man very friendly and easygoing--he took some pictures of the Mate Desktop and Fish Shell, saying he never seen such in his life, and he had a few Linux experiences. Then he said there is another customer using Linux, and maybe I could help whatever. I added WeChat and I went home.

## Wifi Connection Summary

### Check Network Interfaces

Run the command `ifconfig` to list the active network interfaces. If `wlan0` is not listed and only `lo` appears:

- Identify Wireless Hardware

Use `pciconf -lv` to list all PCI devices. Specifically, filter for the wireless module (in my case): `pciconf -lv | grep iwm`
This command should return details such as `iwm0@pci0:1:0:0` followed by hardware details.
- Configure Network Interface

- Edit `/etc/rc.conf` to add(in my case for `iwm0`):

```
wlans_iwm0="wlan0"
ifconfig_wlan0="WPA SYNCDHCP"
```

- Restart Network Interface `service netif restart`
- Verify that wlan0 is present with `ifconfig`

### Configure Internet Access via wpa_supplicant
- Set DNS Servers: edit /etc/resolv.conf 
```
nameserver 1.1.1.1
nameserver 1.0.0.1
```
- Create WiFi Configuration File

```
network={
  ssid="your_network_ssid"
  psk="your_network_password"
}
```
Ensure there are no commas between the lines.
- Connect to the WiFi Network
- Activate the wireless interface: `ifconfig wlan0 up`
- Run wpa_supplicant to manage the WiFi connection: `wpa_supplicant -B -i wlan0 -c wifi.conf`
- Obtain an IP address using DHCP:`dhclient wlan0`
- Restart Network Services:`service netif restart`


## Changing Mirrors
Change the file `sudo vi /usr/local/etc/pkg/repos/FreeBSD.conf` to
```
FreeBSD: {
  url: "http://mirrors.ustc.edu.cn/freebsd-pkg/FreeBSD:14:amd64/latest",
}
```
(amd64 for me, might be different)

Then Update and Upgrade Packages
```
pkg-static update
pkg-static upgrade
pkg-static install -f pkg
```
Install essential softwares
```
pkg install bash vim nano sudo curl wget git tmux screen htop
```

## Configuring Xorg

This part is so hard to start and it took me a million years. I finally managed to work around by changing the driver to `scfb`

## `neofetch`

![](https://pub-d4faddea0e514259be1d9061dbe45aae.r2.dev/Screenshot%20from%202024-04-13%2002-17-17.png)

## Getting Packages from Ports

So in freebsd there is ports. sort of like `aur`, and the packages not available in the official repo can be compiled through that, but you first pull all the code locally, then occasionally pull them from github, and compile the things needed. All the code together was only 1.1 GB.

```
sudo git clone --filter=tree:0 https://mirrors.ustc.edu.cn/freebsd-ports/ports.git /usr/ports
```

Even chromium isn't available in the official repo, so lots of things needed to be compiled.(kinda like Gentoo)

## Problems

Tutorials aren't as comprehensive as Linux, but people say BSD is more stable.

The wifi is too much of a pain, and there isn't a frontend for it anywhere. Connecting through `wpa_supplicant` is very tiresome. 

I am practically a noob in wifi configuration. I have used iwctl and nmtui but not wpa_supplicant that much, and in the end I settled with `GhostBSD` as it is more straightforward.

## Fixing the Signature Problem in GhostBSD

I can also use a FreeBSD mirror in GhostBSD, but there is default validation configuration, simply comment out these lines in `/etc/pkg/GhostBSD.conf`,
```
GhostBSD: {
  url: "https://pkg.ghostbsd.org/stable/${ABI}/latest",
#  signature_type: "pubkey",
#  pubkey: "/usr/share/keys/ssl/certs/ghostbsd.cert",
#  enabled: yesexport http_proxy="http://localhost:7890/"
}
```

The default mirror is very very slow, so I switched back to USTC FreeBSD mirror.

## Latest Mirror Lack of tools

The latest mirror doesn't have lots of things like chromium or osscode, so I switched to the quarterly mirror. It doesn't have `os-generic-userland-devtools` as well, which is required to compile packages, so I ended up switching having a really long time figuring out how to configure things to compile.

## References

- [FreeBSD Handbook](https://docs.freebsd.org/en/books/handbook/)
- [GhostBSD Handbook](https://ghostbsd.org/handbook)
- [WPA Supplicant Documentation](https://w1.fi/wpa_supplicant/)
