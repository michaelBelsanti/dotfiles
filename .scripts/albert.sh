#!/usr/bin/env bash

running=$(pgrep -l albert | awk '/albert$/ {printf $2}')
if [[ $running == 'albert' ]]
then
    albert show
else
    albert &
    sleep .1
    albert show
fi
