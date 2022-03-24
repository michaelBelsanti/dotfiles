#!/usr/bin/env bash

alacritty -e paru

if [ $? -eq 0 ]; then
	notify-send --app-name=Updates "Updates failed :("
else
	notify-send --app-name=Updates "Updates completed!"
fi

# Used to find wm name, but if you don't 
# switch often you can delete this and hardcode it
wm=$(wmctrl -m | awk 'NR==1{print $2}')

~/.config/polybar/$wm.sh
