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
- Jonaburg Picom Fork
- Polybar
- Rofi
- Tilda
- Replay Sorcery

``` sh
paru -S --needed alacritty dunst fish flashfocus-git goverlay i3-gaps picom-jonaburg-git polybar rofi tilda replay-sorcery
```

# Optional Dependencies
These are programs that are used in my i3 or fish config.

- Albert
- Betterlockscreen
- Brave
- Btop++
- Nitrogen
- Nyrna
- Flameshot
- Lightcord
- Lxpolkit
- TheFuck

``` sh
paru -S --needed albert betterlockscreen brave-bin btop nitrogen nyrna flameshot lightcord-bin lxpolkit thefuck 
```

## Optional Fish Dependencies
- Oh My Fish (this is used to install thefuck in fish)

 ``` sh
curl -L https://get.oh-my.fish | fish 
 ```

- Fisher (used to install tide)
``` sh
curl -sL https://git.io/fisher | source && fisher install jorgebucaran/fisher
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
