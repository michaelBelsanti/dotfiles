#!/usr/bin/env bash

# Terminate already running bar instances
killall -q polybar
# If all your bars have ipc enabled, you can also use 
# polybar-msg cmd quit

# Launch bar1 and bar2
#
bool=1

while [ $bool -eq 1 ]
do
    running=$(pgrep -l easyeffects | awk '/easyeffects$/ {printf $2}')
    if [[ $running == 'easyeffects' ]]
    then
        bool=0
        echo shid
    fi
done

echo "---" | tee -a /tmp/polybar1.log /tmp/polybar2.log
polybar main 2>&1 | tee -a /tmp/polybar1.log & disown
polybar secondary 2>&1 | tee -a /tmp/polybar1.log & disown

echo "Bars launched..."
