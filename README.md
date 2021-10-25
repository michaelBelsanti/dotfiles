# dotfiles
My shitty dotfiles

Made using [Yadm](yadm.io/#)

This command will install my config directly into your config files.
``` sh
yadm clone https://github.com/quasigod-io/dotfiles.git
```
* The awesome rofi scripts were not made by me, I am not that talented. Find the originals here https://github.com/ntcarlson/dotfiles .

# Applications Used
Many of these are mentioned in my i3 config, if you choose not to use one, be sure to remove or change it.
- Alacritty
- Doom Emacs
- Dunst
- Fish
- Flashfocus
- Goverlay
- i3-gaps
- Paru
- Jonaburg Picom Fork
- Polybar
- Rofi
- Tilda
- Replay Sorcery

## Optional Fish Dependencies

``` sh
paru -S --needed alacritty dunst fish flashfocus-git goverlay i3-gaps picom-jonaburg-git polybar rofi tilda replay-sorcery
```

# Optional Dependency
These are programs that are executed in my i3 or fish config.

- Brave
- Albert
- Btop
- Nitrogen
- Betterlockscreen
- Flameshot
- Lxpolkit
- Lightcord
- TheFuck

``` sh
paru -S --needed brave-bin albert btop nitrogen betterlockscreen flameshot lxpolkit lightcord-bin thefuck 
```

# Neovim and Emacs
Both of these configs are premade ones. [NvChad](https://github.com/NvChad/NvChad) and [Doom Emacs](https://github.com/hlissner/doom-emacs) respectively.

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

# How to use package lists:

* Pacman: 

``` sh
sudo pacman -S --needed - < pacmanpckgs.txt
```

* AUR:
``` sh
paru -s --needed - < yaypckgs.txt
```
* Paru is used for example, replace it with whatever AUR helper you use of course.
