#!/bin/sh
#
bool=1
while [ $bool -eq 1 ]
do
    running=$(pgrep -l pipewire | awk '/pipewire$/ {printf $2}')
    if [[ $running == 'pipewire' ]]
    then
        bool=0
    fi
done

easyeffects --gapplication-service
