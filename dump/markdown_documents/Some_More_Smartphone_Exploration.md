---
title: "Some More Smartphone Exploration"
date: Fri Jan 26 2024 02:38:01
type: other
---
## Exploring More Phones

I've failed countless times while experimenting with different phones
and operating systems.

Unlike computers, which have a universal architecture, each phone
possesses its unique structure. This makes installing operating systems
on them exceedingly challenging.

Furthermore, the repair technicians lack the necessary expertise to
assist me with these challenges. Consequently, I've had to solve all the
problems myself, which adds a layer of frustration to the process.

## Exploring Pinephone

In a post (<https://www.jimchen.me/blog/Thu%20Sep%2028%202023%2000:38:25>) I
wrote last September, I shared my journey with the PinePhone. Following
that, the PinePhone could no longer read the microSD card and
encountered a gnupg error that I couldn't resolve.

## Unlocking Bootloader

Then, I unlocked the bootloader of my old Redmi Note 10, which I had
used 2.5 years ago. After unlocking, I attempted to install Ubuntu
Touch. However, the ubports installer consistently faced a downloading
issue due to GitHub connectivity problems, which I couldn't fix. Thus, I
was unsuccessful in installing Ubuntu.

## Trying to Install Different OS

Next, I attempted to install LineageOS on the Redmi Note 10. However,
after booting into fastboot mode, I couldn't flash the boot.img and
recovery.img onto the phone. The fastboot froze indefinitely while
transferring these files, leaving me unable to proceed.

Postmarket OS appeared to only support Pinephone and Librem 5 phones.
However, my PinePhone stopped reading any SD card, so installing it was
not feasible.

## Removing Xiaomi Bloatwares

I then used adb to list packages with `adb shell pm list packages`, and
discovered numerous bloatwares. Xiaomi, in my opinion, is the worst
company, with their phones filled with unnecessary spywares.

After listing the MIUI packages, I used `adb shell uninstall` to remove
them, aiming to eliminate the cumbersome MIUI. Some apps were
successfully uninstalled, while others persisted, and I couldn't remove
them even with root permissions.

Subsequently, I found myself unable to return to the home screen, and
upon rebooting, the phone entered a boot loop, rendering it inoperable
yesterday.

## Repairing People with Intellectual Retardation

So I went to MiUI store, hoping to get the crap fixed and get LineageOS
installed. But the reparing person are kind of intellectual retarded,
and they know far less than me though. They didn't even know or care
what is LineageOS. The technicians there seemed less knowledgeable than
me about such niche, open-source, and controlled systems. They were
unfamiliar with adb and couldn't assist in reviving my phone.

Nevertheless, I managed to figure out how to reopen the phone today
fairly quickly. By entering the recovery menu and wiping all the data,
the phone rebooted into a new MIUI system, again laden with bloatwares.

## Messing Up with Phone Once More

This time, I didn't blindly remove all Xiaomi bloatwares. Instead, I
researched online and tried to remove only those identified as
bloatwares. Since there were hundreds, manual removal was impractical,
further highlighting the phone's annoyances.

After using adb to uninstall and disable some apps, I encountered issues
installing new apps due to not being signed into the MIUI account.
Uninstalling certain apps had prevented me from signing in, leaving me
with no option but to wipe the data again.

## Trying to Customize Again

On my next attempt, I removed the packages manually, one by one. It was
a tedious process. After removing the theme, my wallpaper became pure
black, aligning with my preference for dark mode.

Then, I installed Google Phone, Google Files, Google Messages, Google
Photos, Google Chrome, and some other apps using APK Pure, Softonic, and
Uptodown APKs via computer and adb.

I tried installing Google Play Store, but it wouldn't open. Even using a
Google installer didn't help. However, I realized that I didn't
particularly need the Google Play Store. Firstly, I don't heavily rely
on a smartphone, with WeChat being my primary app. Secondly, I'm not a
fan of the Google Play Store. Thirdly, I can source all necessary APKs
myself.

## Conclusion

In summary, my journey with different smartphones isn't satisfactory at
all. But anyways I am not like depending on it to live or something, so
I think leaving it be at this moment seems the right choice.

## References

- [PinePhone](https://www.pine64.org/pinephone/)
- [Ubuntu Touch](https://ubports.com/)
- [LineageOS](https://lineageos.org/)
- [Postmarket OS](https://postmarketos.org/)
