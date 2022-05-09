#!/bin/env sh

echo 'always' | sudo tee /sys/kernel/mm/transparent_hugepage/enabled
# obs --startreplaybuffer &
killall picom &
dunstctl set-paused true &
polybar-msg action dnd module_show &
polybar-msg action gamemode module_show &
