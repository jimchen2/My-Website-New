---
title: "Exploring LFS"
date: Sat Oct 14 2023 01:54:23
type: linux
---
## Why?

So basically after trying out a few distributions I wanted to try
something else, and there is Linux From Scratch.

## What?

It is basically building a linux environment in a separate disk
partition.

There is a handbook, and I followed the handbook closely with ChatGPT
explaining some stuff.

It is just a lot of copy pasting code from the handbook to execute in
terminal.

## Basic Steps

-   Creating and formatting partition
-   Installing Temporary Tools
-   Chroot into it and Installing Packages
-   System Configuration

The first parts are very straightforward, and installing packages took a
long time.

## Problems

After installing the kernel, the system doesn\'t boot. So I pointed the
kernel to Arch Linux(my host system)\'s kernel and it booted, but with
some errors and warnings. It can not find wireless interface and only
returned `lo` when I run `ip link`

## BLFS packages

There are many packages depending on each other so installing something
is really hard. For example, the Gnome Desktop have a million
dependencies, and after a while I run out of patience trying to install
them, so I thought no gui good enough.

Without the kernel properly configured, I don\'t think there is much
point in gui anyways, and you don\'t need a gui for computer to
function.

## No Package Manager

Without package manager, I need to manually build every package. LFS
book specifies how to build many packages and I thought I would run into
many more bugs if I am to build them myself.

## Conclusion

So after all, I would still use Arch Linux(and a little Ubuntu), and LFS
is just a fun project, and hopefully I did understand something more
about the system.

I am very grateful for LFS community, and registered my name in their
website, and I appreciate and would stick to open source.

## References

- [Linux From Scratch (LFS) Handbook](https://www.linuxfromscratch.org/lfs/view/stable/)
- [Beyond Linux From Scratch (BLFS) Handbook](https://www.linuxfromscratch.org/blfs/view/stable/)
