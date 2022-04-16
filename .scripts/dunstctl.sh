#!/bin/bash

if [ "$(dunstctl is-paused)" = "true" ]; then
  dunstctl set-paused false; sleep 0.5
  notify-send --app-name="DND" "Do not disturb disabled"
  echo true
fi
if [ "$?" = "false" ]; then
  notify-send --app-name="DND" "Do not disturb enabled"
  sleep 2; dunstctl set-paused true
  echo false
else
  echo "fuck you"
fi
