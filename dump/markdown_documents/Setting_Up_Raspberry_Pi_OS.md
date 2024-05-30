---
title: "Setting Up Raspberry Pi OS"
date: Sat Oct 21 2023 23:09:09
type: linux
---
## Download the OS Image

I downloaded the light version(about 450 MB)

## Install `qemu`

Since my laptop is x86 and Rasp Pi OS is Arm, I cannot chroot into it
natively. I need qemu

## Chrooting

I downloaded 64-bit OS, and after chrooting

    sudo chroot /run/media/$USER/rootfs /usr/bin/qemu-aarch64-static /bin/bash

I couldn't do basic commands like `ls`, `cd`.

## Registering the Architecture

So after checking the folder

    ls /proc/sys/fs/binfmt_misc/

I found the `qemu-aarch64` isn't registered so I manually register it

    echo ':qemu-aarch64:M::\x7fELF\x02\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\xb7:\xff\xff\xff\xff\xff\xff\xff\x00\xff\xff\xff\xff\xff\xff\xff\xff\xfe\xff\xff:/usr/bin/qemu-aarch64-static:' | sudo tee /proc/sys/fs/binfmt_misc/register

## Adding the Wifi Service

After chrooting, I can run commands now.

I add the wifi service to automatically connect to Berkeley Eduroam. So
I add a service `/etc/systemd/system/connectwifi.service`

    [Unit]
    Description=Connect to BerkeleyEduroam
    After=network.target

    [Service]
    Type=oneshot
    ExecStartPre=/bin/sleep 30
    ExecStart=/usr/local/bin/connectwifi.sh
    RemainAfterExit=yes

    [Install]
    WantedBy=multi-user.target

## Adding a Sanity Check

When I tried using nmap to find the ip to ssh into it returned dozens of
addresses and I couldn't find the appropriate one.

To make a sanity check to see if Rasp Pi is connected to wifi, I added
another service, I post the ip address online every minute

    [Unit]
    Description=Send notification to webhook.site
    After=network-online.target
    Wants=network-online.target

    [Service]
    Type=oneshot
    ExecStart=/usr/local/bin/send_webhook.sh

    [Install]
    WantedBy=multi-user.target

I used webhook, and the script

    #!/bin/bash

    IP_ADDRESS=$(ip addr show wlan0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1)

    curl -X POST https://webhook.site/da5810be-d59c-4746-962e-bccd2a778cc3 -d "ip=$IP_ADDRESS"

## Configure Passwords

Then I configured the password of pi to be "password"

## `ssh`

After setting up the network to start default at boot, I could ssh into
it from the same network.

    ssh pi@10.40.88.225

## Trying basic commands

    echo 0 | sudo tee /sys/class/leds/ACT/brightness # Turn off LED
    echo 1 | sudo tee /sys/class/leds/ACT/brightness # Turn on LED
    echo $(($(cat /sys/class/thermal/thermal_zone0/temp)/1000))°C # Show temperatures

## Transfering Files

    scp <filename> pi@10.40.88.225:/home/pi/

## Playing Music

I can move mp3 files into the Rasp Pi OS then use cvlc, for example

    cvlc "yt1s.com - Би2  Молитва OST Метро.mp3"

I can adjust volumes with `alsamixer`

## References

- [Raspberry Pi Downloads](https://www.raspberrypi.com/software/)
- [QEMU Documentation](https://www.qemu.org/documentation/)
- [Webhook.site](https://webhook.site/)
- [Alsamixer](https://linux.die.net/man/1/alsamixer)
