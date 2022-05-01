local awful = require("awful")

awful.spawn("xrdb -load ~/.config/X11/xresources")
awful.spawn("~/.config/polybar/etc.sh")
awful.spawn.once("picom --unredir-if-possible --experimental-backends")
awful.spawn.once("dunst")
awful.spawn.once("tilda")
awful.spawn.once("lxsession")
awful.spawn.once("kdeconnect-indicator")
awful.spawn.once("xrandr --output DP-4 -r 240")
awful.spawn.once("udiskie")
awful.spawn.once("betterlockscreen -u ~/wallpapers/pastel.png")


