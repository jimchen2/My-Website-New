---
title: "Auto-translating in Cloud"
date: Tue Feb 13 2024 02:10:38
type: web
---
## Attempting to Set Up My Own Docker

As a dedicated Arch Linux user, I aimed to create an Arch Linux Docker.
I consulted ChatGPT for a script and created one with yay. It compiled
successfully on my machine, except for when building yay - installing
golang consistently resulted in a network error. To resolve this, I
switched to yay-bin, and everything functioned properly.

However, deploying it on a GPU caused the Docker to malfunction with
Nvidia. Attempts to install software invariably led to errors, with
messages stating that Nvidia drivers were already installed and certain
library paths were not found. After trying various solutions, such as
specifying the path or reinstalling the libraries, I remained at a loss.

## Opting for a Custom Docker

Ultimately, I selected a Docker precompiled with PyTorch and CUDA, which
performed admirably. Given the wide variety of GPUs, significantly
surpassing those available on Colab and in regions outside mainland
China, my initial choice was an RTX 3090 in Japan. However, the slow
connection speed and limited disk space of only 16 GB (due to my
oversight in not specifying the disk space) proved problematic.
Switching to an A6000 with faster internet speeds yielded a much better
experience.

In comparison to yay, apt's packages are notably
outdated; for instance, the node.js packages are limited to version 12,
lacking support for many features.

Despite Ubuntu's design for stability, my personal experience with Arch
has been devoid of instabilities.

## ffmpeg Issue

The version of ffmpeg installed via apt, frustratingly, did not include
libass by default, eliminating subtitle options. I circumvented this by
downloading the source code and recompiling it with the necessary flags.

## Dropbox Token Issue

Initially, when using the Python Dropbox SDK, it relied on a short-lived
token that quickly expired, preventing access to Dropbox after 2 hours.
To overcome this, I sourced a script from GitHub that made use of the
refresh token.

Despite these challenges, Vast.ai remains the most cost-effective option
for GPUs.

## References

- [ffmpeg Documentation](https://ffmpeg.org/documentation.html)
- [Python Dropbox SDK](https://dropbox-sdk-python.readthedocs.io/en/latest/)
- [Vast.ai](https://vast.ai/)
