#!/usr/bin/env bash


running=$(pgrep -l discover-overla | awk '/discover-overla$/ {printf $2}')
if [[ $running == 'discover-overla' ]]
then
    pkill discover-overla
else
    discover-overlay
fi
