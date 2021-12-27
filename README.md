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
- Dunst
- Emacs
- Goverlay
- i3-gaps
- Paru
- Picom
- Polybar
- Rofi
- Tilda
- Replay Sorcery
- Zsh

``` sh
paru -S --needed alacritty dunst emacs goverlay i3-gaps picom polybar rofi tilda replay-sorcery zsh
```

# Other Programs

## i3
These are programs that are launched on starup or have keybinds in my i3 config. Remember to remove the one you don't use from the config.

- Albert
- Betterlockscreen
- Vivaldi
- Flameshot
- Nitrogen
- Lxsession
- Powercord
- Replay Sorcery
- Spotifyd

``` sh
paru -S --needed albert betterlockscreen vivaldi easyeffects flameshot nitrogen nyrna lxpolkit powercord-electron-git spotifyd
```

## Zsh
Packages used in my .zshrc

- Broot
- Thefuck
- Shell-color-scripts

``` sh
paru -S --needed broot thefuck shell-color-scripts
```

Note: You'll get a message each time you start a shell until you run broot to create the missing files.

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

# Display Manager

I use LightDM as my display manager, along with with the webkit2 greeter and the aether theme.

``` sh
paru -S --needed lightdm lightdm-webkit2-greeter lightdm-webkit-theme-aether
```

# Warning

These dotfiles are made only for myself, but I include this README in case anyone else wants to try them. Many things in these may not work out of the box for you, such as my polybar script since it uses monitor names. Use at your own risk.