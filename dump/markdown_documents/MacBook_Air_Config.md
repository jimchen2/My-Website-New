---
title: "MacBook Air Config"
date: Tue Apr 30 2024 10:36:48
type: linux
---

## Why MacBook? MacBook Air vs. Darter Pro

- **Battery Life:** MacBook Air wins (over 10h vs. <4h)
- **Hardware:** MacBook Air: longevity; Darter Pro have Random hardware bugs(keyboard issues, unresponsive touchpad), gets dirty easily, and repairs can be more complex due to company in Colorado.
- **Thermals:** MacBook Air stays cool.
- **Software:** MacBook: Proprietary, No ArchLinux, No Mic. System76: Source Code on Github, native Linux
- **Weight:** 1.5kg vs. 1.66kg
- **Noise:** MacBook Air is quiet.
- **Brand:** System76 is more expensive on average, but less recognized

## Downloading Installer for Asahi(in China)

So the files are not available in China, just download and upload them to a S3 bucket (hopefully available in China), then change the urls in the installing script(alx.sh file and installer json file)

## Enabling Fn

MacBook has this annoying feature where you need to press alt+fn+f4(closing) or alt+f2(renaming), so Change this file `/etc/modprobe.d/keyboard.conf`, then `sudo dracut --regenerate-all --force`

```
options hid-apple swap_fn_leftctrl=1
options hid_apple fnmode=2
```

## Remaping Other Keys

Use evremap, Move the executable, then Create a systemd service, then remap with toml config in `/etc/evremap/config.toml`

```
device_name = "Apple MTP keyboard"
# Disable CapsLock
[[remap]]
input = ["KEY_CAPSLOCK"]
output = []
# Swap Super (Windows key) and Alt
[[remap]]
input = ["KEY_LEFTALT"]
output = ["KEY_LEFTMETA"]
[[remap]]
input = ["KEY_LEFTMETA"]
output = ["KEY_LEFTALT"]
# Remap Right Super to Right Alt
# Disable Right Alt
# Swap F3 and F4
# ...(for conciseness)
```

## Removing Gnome Bloatware

## Setting Gnome Shortcuts

`ctrl+alt+t`, `ctrl+e`, `super+d`, `alt+tab`, `super+tab` ...

## Disable While Typing

Use python `evdev` to capture and gsettings to disable.

Add a listener in systemd service

```

for event in device.read_loop():
if event.type == ecodes.EV_KEY:
if event.value == 1: # Key press
key = categorize(event)
if key.keycode not in ['KEY_LEFTALT', 'KEY_RIGHTALT', 'KEY_LEFTCTRL', 'KEY_RIGHTCTRL',
'KEY_LEFTMETA', 'KEY_RIGHTMETA', 'KEY_TAB', 'KEY_LEFTSHIFT', 'KEY_RIGHTSHIFT']:
fifo.write("key_pressed\n")
fifo.flush()

```

Then set a timer and adjust `gsettings` with user systemd service

```
while read -r line; do
    if [[ "$line" == "key_pressed" ]]; then
        if [[ "$state" == "enabled" ]]; then
            disable_touchpad
            state="disabled"  # Update the state variable here
            if [[ $timer_pid -ne 0 ]]; then
                kill $timer_pid  # Stop the previous timer
            fi
            timer &  # Start a new timer
            timer_pid=$!  # Store the PID of the new timer
        fi
    fi
```

##  Clash Verge
Bypass UFW, I compiled with npm tauri.

## References

- [Asahi Linux](https://asahilinux.org/)
- [Evremap Documentation](https://evremap.com/)
- [Clash Verge GitHub Repository](https://github.com/Clash-verge/ClashVerge)
- [Dracut Documentation](https://man7.org/linux/man-pages/man8/dracut.8.html)
