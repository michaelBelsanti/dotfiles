# dotfiles
My shitty dotfiles

Made using [Yadm](yadm.io/#)

This command will install my config directly into your config files.
``` sh
yadm clone https://github.com/quasigod-io/dotfiles.git
```
* The awesome rofi scripts were not made by me, I am not that talented. Find the originals here https://github.com/ntcarlson/dotfiles .

# Applications Used
Applications that I have made or edited configs for.

- Alacritty
- Doom Emacs
- Dunst
- Fish
- Flashfocus
- Goverlay
- i3-gaps
- Paru
- Picom
- Polybar
- Rofi
- Tilda
- Replay Sorcery

``` sh
paru -S --needed alacritty dunst fish flashfocus-git goverlay i3-gaps picom polybar rofi tilda replay-sorcery
```

# Optional Dependencies
These are programs that are launched on starup or have keybinds in my i3 config. They are not necessary.

- Albert
- Betterlockscreen
- Brave
- Easy Effects
- Flameshot
- Nitrogen
- Nyrna
- Lxpolkit
- Pamixer
- Powercord
- Replay Sorcery
- Spotifyd
- VibrantLinux

``` sh
paru -S --needed albert betterlockscreen brave-bin easyeffects flameshot nitrogen nyrna lxpolkit pamixer powercord-electron-git spotifyd vibrantlinux-git
```

# Neovim and Emacs
Both of these configs are premade ones. [NvChad](https://github.com/NvChad/NvChad) and [Doom Emacs](https://github.com/hlissner/doom-emacs) respectively.

Any changes I've made are included, but you'll need to install these for them to look like mine.

# Fonts
- Cascadia Code
- Inter
- Awesome Font 5
- Twemoji
- Material Design Icons
- Unifont

``` sh
paru -S --needed --needed otf-cascadia-code otf-font-awesome ttf-material-design-icons-extended ttf-material-design-icons-webfont ttf-twemoji ttf-unifont
```
