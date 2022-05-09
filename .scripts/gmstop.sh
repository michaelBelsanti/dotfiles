#!/bin/env sh

echo 'madvise' | sudo tee /sys/kernel/mm/transparent_hugepage/enabled & 
# killall obs & 
picom --experimental-backends --unredir-if-possible &
dunstctl set-paused false &
polybar-msg action dnd module_hide &
polybar-msg action gamemode module_hide &
