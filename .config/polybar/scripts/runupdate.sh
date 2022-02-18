#!/usr/bin/env bash

alacritty -e paru

~/.config/polybar/launch.sh

notify-send --app-name=Updates "Update script completed"
