---
title: "Trying adb, Failed, and Recovering My Computer"
date: Sun Sep 17 2023 15:29:34
type: phone
---
## Why?

I want to use Ubuntu Touch os since iphone and android won\'t let me
access the terminal easily and it is not that customizable. The steps
include unlocking the phone bootloader and using ubports to install
Ubuntu Touch.

## adb Didn\'t Work

So yesterday is an interesting day.

Everything went the way a normal weekend would go.

Then in the afternoon I was trying the adb on my Ubuntu computer, but it
just wouldn't work no matter how hard I tried. I tried adb devices and
adb start-server and adb kill-server but none of them responded, and I
reinstalled it 3 times, and installed the platform-tools twice but it
still wouldn't work. Miraculously it worked on the cloud server.

It is quite uncommon for an application to have a bug that is hard to
fix like this, well maybe except for wine or android emulators bugs.

adb wouldn\'t respond with all of the commands

    adb devices
    adb start-server
    adb kill-server

And I asked ChatGPT how to fix the bug, and it told me various ways like
using strace and aux and grep the service, but the just wouldn't work.
Any commands associated with adb would freeze in the terminal.

## Trying to Debug the Problem

So I tried the process

    ps aux | grep adb
    pkill -f adb

It did terminate adb but nothing else, adb won\'t respond.

Only

    adb version

did respond, then I tried

    rm -rf ~/.android

These wouldn\'t respond when I tried to start the server and debug,

    adb -L tcp:5037 fork-server server --log debug
    env -i adb start-server

I mean if there are bugs the bugs should be easily spotted, but in this
case it would just freeze in terminal

Then I tried to trace the startup process

    strace adb start-server

but it showed

    bind(3, {sa_family=AF_INET, sin_port=htons(0), sin_addr=inet_addr("127.0.0.1")} 16) = 0
    connect(3, {sa_family=AF_INET, sin_port=htons(5037), sin_addr=inet_addr("127.0.0.1")} 16) = -1 ECONNREFUSED (Connection refused)
    close(3) = 0
    socket(AF_INET6, SOCK_STREAM, IPPROTO_IP) = 3
    bind(3, {sa_family=AF_INET6, sin6_port=htons(0), sin6_flowinfo=htonl(0), inet_pton(AF_INET6, "::1", &sin6_addr), sin6_scope_id=0} 28) = 0
    connect(3, {sa_family=AF_INET6, sin6_port=htons(5037), sin6_flowinfo=htonl(0), inet_pton(AF_INET6, "::1", &sin6_addr), sin6_scope_id=0} 28

Then I was really frustrated. Then Chatgpt told me to

    sudo apt-get purge libudev-dev

And I tried that command, and it broke my computer. Suddenly my computer
could no longer boot.

## Remembering the Homework Deadline

Then I remembered I had to do a homework by the end of the day(like 2
hours work), so I was very anxious indeed, and I went to the school and
tried work on the windows computer there.

But the homework wouldn't work in the school's windows computer(without
python) and gooogle colab, since it constantly complained about modules
and libraries.

And I tried for 2 hours without any success of making the homework run
on the school's computer or the cloud server, and the school\'s library
is closing, so I went back home again and tried to fix the computer.

## Emergency Mode

The computer boots into emergency mode when it starts, and I had no idea
what to do. After trying the root password several times I finally
managed to boot into root, but the systemd was broken, and I entered
recovery mode and tried to fsck the system.

A dev service was kind of broken, and Ubuntu couldn\'t launch.

Anyways, it didn't work well, and I didn't know how to connect to the
internet with the computer. So I tried booting from a usb disk, and it
didn't went well either. I still couldn't connect to the internet.

## Installing from USB Again

So I tried to install Ubuntu again from the usb stick. But when booting
the old network thing went wrong again. So I tried changing the network
service timeout and it worked.

    sudo nano /lib/systemd/system/networkd-wait-online.service

Then change add timeout to 1 second after the exec command.

Then I could only make Ubuntu connect to internet with ethernet,
connecting my phone to the computer with a usb and then by using
`ip link` to list devices then `sudo dhclient enx…` to connect to that
device, then I could go online, but there was this no additional driver
found, and I tried cloning the rt driver and it didn't work. However, it
continuously shows no Wi-Fi adapters found.

## Rubbish Redmi Unlocker

However, my redmi phone was locked by the bootloader, so I needed to
unlock the bootloader to be root. However, I opened the
https://unlock.update.mini.com and it wouldn't download for like 10
times. It is very crappy indeed. Then when I finally get it to download
it returned a zip with only exe files in it, which is totally terrible
and inconsiderate for the company.

I tried running the exe with wine but it face so many problems. It
wouldn\'t even display. Wine is the most buggy program in Ubuntu.
Yesterday I went to the school and tried running it on the school's
windows computer but it couldn't detect the Redmi phone connected.

So since the bootloader was only in exe I decided it is very crap
anyways. So I started to hate redmi like I hate windows.

## Phone Ownership

Then I thought about phone ownership and reckoned that if I cannot
access the bootloader I do not really own this phone. I cannot customize
anything, the phone is just basically owned by the company. Don\'t talk
about security and integrity measures, if I cannot do customized
settings in this phone I do not own it 100%, and that\'s not good.

## Trying to Overload the Phone

And then I thought since I do not own the phone and the phone is old I
want to try overload the phone with adb.

Adb have no root access since the phone is locked, and I tried fastboot
too, it wouldn\'t load.

Then I tried to play around with the adb shell and tried to overload the
device. I tried a infinite loops.`adb shell "while true; do :; done &`
It instantly made the old phone unusable, but nothing else, and when
unplugged the phone would still run as good as normal.

Then I tried to load large files into the phone
`while true; do adb push large_file.txt /sdcard/; done`, but the storage
soon filled up and the data part was only accessible by root, and the
phone was usable after all the mess around.

## No Wifi-Adapters on Ubuntu

Then the Ubuntu Gnome couldn\'t connect to Wifi, and I couldn\'t figure
out the reason. I could only connect to wifi with a phone and usb
cables.

Then I tried nmcli device wifi list, but it returned

    IN-USE  BSSID              SSID                            MODE   CHAN  RATE   >

I figured it was because I disabled the network devices earlier on, and
after `ls /lib/systemd/system | grep etwork` it returned multiple
services,

    systemd-networkd.service
    systemd-networkd-wait-online.service
    NetworkManager.service
    NetworkManager-wait-online.service

the networkd service causing the
`A start job is running for wait for network to be configured` problem,
I might actually accidentally disabled the other.

Then I tried other desktop environments like lxde but lxde wouldn't boot
and encountered multiple system problems.

## Watching the Russian Figure Skating Test Skate Free Program

And then I had tried like 12 hours without success and missed my
homework deadline so I was very much in distress. It was 5 am in the
morning. So I watched Russian figure skating test skate free program
live on <https://1tv.ru> and went to sleep.

## Installing Ubuntu Again

Then I installed the Ubuntu again today, erasing yesterday's partition
and there was no Wi-Fi adapter problems.

The steps are

-   boot the system (with/without network configurations)
-   connect phone to computer and use dhclient to connect to Internet
-   `sudo apt update && sudo apt install ubuntu-desktop gdm3`
-   `sudo systemctl start gdm3`

Then enable the timeout in \'systemd-networkd-wait-online.service\'.

## References

- [Ubuntu Touch](https://ubports.com/)
- [Android Debug Bridge (adb)](https://developer.android.com/studio/command-line/adb)
- [Unlock Your Xiaomi Device](https://en.miui.com/unlock/)
