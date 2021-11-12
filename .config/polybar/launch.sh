#!/usr/bin/env bash

# Delay to prevent alsa module from breaking
#sleep 2

# Waits for easyeffects to prevent alsa module from breaking
bool=1

while [ $bool -eq 1 ]
do
    running=$(pgrep -l easyeffects | awk '/easyeffects$/ {printf $2}')
    if [[ $running == 'easyeffects' ]]
    then
        bool=0
    fi
done

# Terminate already running bar instances
killall -q polybar

# Launch bar1 and bar2
echo "---" | tee -a /tmp/polybar1.log /tmp/polybar2.log
polybar main 2>&1 | tee -a /tmp/polybar1.log & disown
polybar secondary 2>&1 | tee -a /tmp/polybar1.log & disown

echo "Bars launched..."

pamixer --source $(pamixer --list-sources | awk '/Blue/ {print $1}') --set-volume 40
