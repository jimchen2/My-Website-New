---
title: "The Unsuccessful and Frustrating Journey of Exploring PinePhone "
date: Thu Sep 28 2023 00:38:25
type: phone
---
## Why

So I want to try linux on my phone, and last week I couldn\'t unlock the
android phone, so I bought a PinePhone since it is quite cheap.

## Booting

The phone boots into Manjaro OS, and uses KDE Plasma.

## Problem

1.  GUI Problem

Sometimes the screen become too small vertically(without adjustments),
and I couldn\'t see all of the display.

For example gedit couldn\'t save files since the save button is out of
screen.

2.  Wifi Problem

Since the wifi in settings has a pretty bad GUI, I couldn\'t connect to
wifi through settings, but had to connect to wifi through command line.

3.  App Problem

Many apps would suddenly shut down when I am using them, even like gnome
settings.

4.  Boot Problem

After I run `sudo pacman -Syu` the phone won\'t boot, complaining about
rtu. I couldn\'t boot into recovery mode by holding volume and power.

5.  Microsd Read Problem

At the afternoon of the second day I bought the phone, it wouldn\'t read
the microsd I plugged in, saying card error, so I couldn\'t boot
anything into the phone.

6.  Keyboard Problem

In terminal I need \"ctrl\", which isn\'t in the keyboard normally. When
I first entered the terminal the ctrl key was there but then if I press
anywhere else the ctrl key disappears and I had to enter terminal again.

Each of those problems cost me a long time, and I do not know how to
solve them(for real).

## Sliding the Sim card inside

So I tried putting my sim card inside PinePhone but it wouldn\'t go in,
so I slide it inside, and it couldn\'t come out.

## Going to the Repair Store

So I went to the Repair store, hoping they would try to set up PinePhone
for me, but they said they didn\'t support the type of phone.
Fortunately they got my sim card out, so i was thankful.

## What did I do?

### Booting Arch Linux from microsd

Since the phone wouldn\'t boot after I run update last night, this
morning I went to Albany to buy a microsd, and then boot a jumpdrive
into the microsd, then write the Arch Linux image with Phosh into the
PinePhone. Everything was good and the phone booted into Arch.

I used Ubuntu mostly and I am not entirely familiar with Arch. I went to
the command line and tried some, and fortunately it worked. However, I
couldn\'t connect to the wifi.

### Connecting to the Wifi

I tried the gnome setting but the gnome setting would quit every few
seconds for no reason. So I tried connecting to wifi from command line.
I tried `nmtui` but it didn\'t support the Berkeley Eduroam Internet.
Also the wifi couldn\'t discover my phone\'s hotspot.

Then I tried `nmcli`

    #!/bin/bash

    sudo nmcli con add con-name 'BerkeleyEduroam' \
    ifname wlan0 \
    type wifi \
    ssid 'eduroam' \
    wifi-sec.key-mgmt wpa-eap \
    802-1x.eap peap \
    802-1x.identity 'jimchen@berkeley.edu' \
    802-1x.password '<password>' \
    802-1x.phase2-auth mschapv2

I had to manually type those commands myself and they lead to many
errors. I couldn\'t even use gedit.

Anyways, after that at school the Arch PinePhone would connect to school
Internet.

### Tried Openssh

The openssh didn\'t work on the phone no matter how hard I tried, the
computer just couldn\'t detect the phone. I changed the ssh config and
allowed root login

    /etc/ssh/sshd_config

but my computer couldn\'t detect the phone while on the same network.

### Pacman Update Error

Then I tried updating the phone and installing other things but it would
always return

    error:GPGmE error: no data

I tried

    sudo rm -r /etc/pacman.d/gnupg
    sudo pacman-key --init
    sudo pacman-key --populate archlinux

But it didn\'t work. It would encounter same error all over again.

### Tried Downloading Ngrok

I thought if I could connect through Ngrok to my computer everything
will be easy. However, there wasn\'t any wget, and when I tried to

    curl -O https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-arm.tgz

It says the source couldn\'t be validated, and it couldn\'t be
downloaded.

So in the end it is practically the same like without Internet since I
couldn\'t do anything except curl html elements on a specific website.

Firefox didn\'t work because it said profile didn\'t find, and there was
the nasty GUI problem where all buttons got out of screen.

### Tried to boot Ubuntu Touch

So I tried to boot Ubuntu Touch into the Microsd card, but the phone
wouldn\'t read the microsd card when it boots, and after about 50
seconds it would switch back to Arch. At this point the jumpdrive
didn\'t work too.

## Feeling Disappointed

Laptop Linux are so fun for me but I seemed to have a little problem
with mobile Linux. I am very sad I achieved almost nothing today, and
spent all my time over this crappy little device.

I could practically do nothing on the system now, so maybe I will try to
buy another microsd card and try booting from there, and hopefully
Ubuntu Touch will work out, since I am much more familiar with Ubuntu.

## Should I Still Using IOS

Then I thought whether should I keep use IOS. And that is a very
interesting question. To be honest if Linux distros works out fully good
for me I would not use IOS, but again the PinePhone is cheap and
functions much worse(as I heard) than either Android or IOS. The pricer
Linux phones are Librem 5 which is like 1000 dollars, almost as
expensive as a new high-computation laptop(like the system76 I just
bought). I thought it hilarious to buy a phone with such a price. Then
again, Linux are meant to be cheaper and more functional and more
customizable, instead of expensive and hard to use. Moreoever, the
PinePhone ran into a million bugs, which I couldn\'t fix even in one
whole day, and that is before it even have basic functions.

Even if the PinePhone is fully set up it would still be not even half as
good as IOS speaking of funtionality.

## Why is IOS not comfortable?

If only IOS allow more customization I wouldn\'t even think of this in
the first place.

First: the app store. Even though it has enough apps I still want to
install apps myself instead of through app store.

Second: the desktop. I want to customize it to run like gnome or lxde
but it wouldn\'t let me customize the desktop.

Third and most importantly, there is no command line in IOS, which like
you cannot know anything about the phone, which is very sad. It feels
like living in someone else\'s house and the phone doesn\'t seem to
belong to me 100%.

It is not that I hate IOS or something, unlike Windows, which I hate so
much. I am just a obsessed Linux fanatic.

It\'s not like I can do anything about my personality, if I could then I
probably wouldn\'t be the one I am right now.

So yeah I thought I would still use IOS, which is kind of sad. The
PinePhone didn\'t come as I had expected to be, although I think I
should adjust my expectation for such a cheap phone anyways.

## What to do in Future with PinePhone

Even if I don\'t use PinePhone primarily I could still use it for fun
occasionally, like connect my computer terminal to it and run some
programs on PinePhone(for example, computer virus, since I don\'t care
about it anyways). It seems a good virtual machine. I can also use it on
some occasions if there isn\'t demanding tasks, like only calling and
messaging, at least it has more functions than my Philip Senior Citizen
Phone.

## References

- [PinePhone](https://www.pine64.org/pinephone/)
- [Manjaro ARM](https://manjaro.org/downloads/arm/)
- [Arch Linux ARM](https://archlinuxarm.org/)
- [NetworkManager CLI Reference](https://developer.gnome.org/NetworkManager/stable/nmcli.html)
- [Ngrok](https://ngrok.com/)
