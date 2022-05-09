#!/bin/env sh

if [ "$(dunstctl is-paused)" = "true" ]; then
  dunstctl set-paused false
  notify-send --app-name="DND" "Do not disturb disabled"
  polybar-msg action dnd module_hide
else
  notify-send --app-name="DND" "Do not disturb enabled"
  sleep 1; dunstctl set-paused true
  dunstctl close-all
  polybar-msg action dnd module_show
fi
