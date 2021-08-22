# dotfiles
My shitty dotfiles

Made using [Yadm](yadm.io/#)

This command will install my config directly into your config files.
```
yadm clone https://github.com/quasigod-io/dotfiles.git
```
* The awesome rofi scripts were not made by me, I am not that talented. Find the originals here https://github.com/ntcarlson/dotfiles .
# Neovim Config
I just use [doom-nvim](https://github.com/NTBBloodbath/doom-nvim).

# How to use package lists:
* Pacman: 
```
sudo pacman -S --needed - < pacmanpckgs.txt
```
* AUR:
```
paru -s --needed - < yaypckgs.txt
```
* Paru is used for example, replace it with whatever AUR helper you use of course.

* If you pacman refuses to recognize any of the packages simply cry and install them all manually as I do.
