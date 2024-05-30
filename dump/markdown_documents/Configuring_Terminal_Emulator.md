---
title: "Configuring Terminal Emulator"
date: Wed Oct 25 2023 03:54:28
type: linux
---
## Terminal Emulator

The default terminal emulator in GNOME, gnome-terminal, leaves a lot to
be desired when it comes to intuitive copy-pasting. The necessity of
using the mouse to select text, followed by `ctrl+shift+c` to copy,
feels cumbersome. Moreover, navigating through it isn\'t as smooth as
one would hope.

My journey took me through various terminals: byobu, xterm, and kitty,
each having their unique perks but none fitting the bill perfectly.

## Vim as a Savior?

I delved into Vim about a year ago but found myself gravitating back to
gedit for most tasks, perhaps not having tapped into Vim\'s true
potential back then. However, I\'ve since recognized the unparalleled
efficiency of Vim, especially for editing extensive text files in the
terminal. Its vast array of shortcuts and keyboard bindings facilitates
an almost mouse-free experience.

## Addressing Terminal Navigation

Initially, I tried `set -o vi` in the gnome terminal to impart vi
behavior, but it wasn\'t seamless. The classic jk commands, which would
typically navigate lines in Vim, fetched previous commands instead.
Plus, unrestricted navigation through past commands was a challenge, and
visual mode was lackluster.

This led me to explore the terminal mode in Vim, which I found a bit
cluttered. In contrast, the terminal mode in Neovim stood out, boasting
a seamless experience. It defaults to normal mode, allowing easy
toggling between insert and visual modes, enhancing terminal navigation
considerably.

## Keybinding Configuration

A noteworthy tweak was adjusting the keybinding to switch to normal mode
in the terminal. The ubiquitous esc key, though tempting, can conflict
with other terminal processes. I remapped the caps key system-wide to
f13 using `xmodmap ~/.Xmodmap` in the bashrc. In my Neovim configuration
(`~/.config/nvim/init.vim`), I added:

    tnoremap <F13> <C-\><C-n>
    xmap <F13> <Esc>
    set clipboard=unnamedplus

This setup achieves two primary goals: linking yanking and pasting in
Neovim directly to the clipboard and utilizing the caps key as a trigger
for normal mode, making the workflow more fluid.

## Modifying gnome-terminal

Optimizing the gnome-terminal to launch with Neovim\'s terminal mode by
default was another enhancement. Achieved with:

    PROFILE_ID=$(gsettings get org.gnome.Terminal.ProfilesList default ` tr -d "'")
    gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:$PROFILE_ID/ use-custom-command true
    gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:$PROFILE_ID/ custom-command 'nvim -c "term" -c "startinsert"'

## Editing Within Neovim\'s Terminal

After ensuring smooth navigation in the terminal, my next focus was on
file editors within Neovim\'s terminal. I noticed Vim had bugs when used
inside the terminal, seemingly due to conflicts with Neovim. However,
Neovim itself was bug-free in this context. I could use the esc key to
enter normal mode in the file editor, and the caps key for Neovim\'s
terminal mode.

## Window Management and More

Neovim\'s `:sp` command comes in handy for window splits, complemented
by the `ctrl+w w` navigation shortcut. This feature is a boon for
simultaneously handling multiple terminal sessions or files.

## Leveraging Terminal Variables

Commands like `!:0` and `!:1` after `python example.py` retrieve
`python` and `example.py` respectively, while `!!` fetches the entire
previous command. Such conveniences bolster efficiency in the terminal.

## Viewing History and Log Access {#historical-insights-and-log-access}

Easily redirecting terminal history with `history > ~/Downloads/history`
has been beneficial. Additionally, the alias:

    alias jnvim="journalctl -n 1000 ` tac ` nvim -"

added to bashrc, streamlines the process of viewing logs, making it a
cinch.


## References

- [GNOME Terminal Documentation](https://help.gnome.org/users/gnome-terminal/stable/)
- [Vim Documentation](https://www.vim.org/docs.php)
- [Neovim Documentation](https://neovim.io/doc/user/)
- [Kitty Terminal](https://sw.kovidgoyal.net/kitty/)
