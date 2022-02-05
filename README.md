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
- Emacs (barely functions)
- Goverlay
- i3-gaps
- Paru
- Picom
- Polybar
- Rofi
- Tilda
- VSCodium
- Zsh

``` sh
paru -S --needed alacritty dunst emacs goverlay i3-gaps picom polybar rofi tilda vscodium zsh
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
- fzf
- Thefuck
- Shell-color-scripts
- Zoxide

``` sh
paru -S --needed broot fzf fzf-tab-bin-git thefuck shell-color-scripts


# Fonts
- JetBrains Mono
- Inter
- Twemoji
- Awesome Font 5
- Material Design Icons
- Unifont

``` sh
paru -S --needed --needed ttf-jetbrains-mono inter-font ttf-twemoji otf-font-awesome ttf-material-design-icons-extended ttf-material-design-icons-webfont ttf-unifont
```

# Display Manager

I use LightDM as my display manager, along with with the webkit2 greeter and the aether theme.

``` sh
paru -S --needed lightdm lightdm-webkit2-greeter lightdm-webkit-theme-aether
```

# Warning

These dotfiles are made for my setup and will need configuring for any other. Make sure to read through the i3, polybar, picom, and zsh configs, as these will depend on your setup and which tools you use.