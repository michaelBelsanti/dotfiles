#!/usr/bin/env bash

# Terminate already running bar instances
killall -q polybar

# Launch bar1 and bar2
echo "---" | tee -a /tmp/polybar1.log /tmp/polybar2.log
polybar i31 2>&1 | tee -a /tmp/polybar1.log & disown
polybar i32 2>&1 | tee -a /tmp/polybar1.log & disown

echo "Bars launched..."

pamixer --source $(pamixer --list-sources | awk '/Blue/ {print $1}') --set-volume 40
