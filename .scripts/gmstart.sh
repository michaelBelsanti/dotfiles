#!/bin/env sh

echo 'always' | sudo tee /sys/kernel/mm/transparent_hugepage/enabled
killall picom &
~/.scripts/togdnd.sh -p
polybar-msg action gamemode module_show &
