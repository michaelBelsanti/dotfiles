#!/usr/bin/env bash

alacritty -e paru

# Used to find wm name, but if you don't 
# switch often you can delete this and hardcode it
wm=$(wmctrl -m | awk 'NR==1{print $2}')
~/.config/polybar/$wm.sh

notify-send --app-name=Updates "Update script completed"
