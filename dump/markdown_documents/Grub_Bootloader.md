---
title: "Grub Bootloader"
date: Sat Oct 14 2023 00:08:43
type: linux
---
## What is Grub?

So grub is basically a bootloader to start the system. The point here is
I\'ve been using grub for almost a year now without a deep
understanding.

Grub boots the system by using grub shell. Grub starts from EFI system
partition.

## Config

There is a configuration file `/boot/grub/grub.cfg` that specifies the
entry I see when the computer first starts. There is also timeout,
default entry.

My grub config looks like this

    set timeout=1

    menuentry "Arch Linux"{
        linux   /vmlinuz-linux root=/dev/nvme0n1p3
        initrd  /initramfs-linux.img
    }

## Config through Grub

Run `sudo update-grub` on Ubuntu, or
`sudo grub-mkconfig -o /boot/grub/grub.cfg` on Arch, that shall generate
the grub file.

Also `os-prober` is interesting tool to detect the partitions.

But I just manually configured everything.

## What if Grub has errors?

If grub goes wrong, boot from a live usb, go to the partition, then
change the files in `/boot/grub/` directory, then it shall work right.

Alternatively, I can boot from grub shell.

## `/boot` Parition

This partition stores linux kernel.

    mount /dev/nvme0n1p1 /mnt
    ls /mnt

I get

    EFI  grub  initramfs-linux-fallback.img  initramfs-linux.img  vmlinuz-linux

## Backup

It is always a good idea to backup the grub.cfg since without grub(if
you don\'t have alternative bootloaders).

## Booting from Grub Shell

The entries in grub is not needed and I can just boot from grub shell.

I can run

    linux /vmlinuz-linux root=/dev/nvme0n1p3
    initrd /initramfs-linux.img
    boot

## Different Kernels

Also kernels sometimes have the same name, e.g. `vmlinuz-lts`,
`vmlinuz-virt`, they are different from one distro to the other.
Pointing different distros(I tried Alpine and Arch pointing to the same
kernel) will have many bugs, for example, the touchpad won\'t respond,
the wifi won\'t load.

I can put the kernel either in `/boot` partition or the ext4 partition.

## References

- [GNU GRUB Manual](https://www.gnu.org/software/grub/manual/grub/grub.html)
- [Arch Linux GRUB Documentation](https://wiki.archlinux.org/title/GRUB)
