#!/usr/bin/env bash

pgrep -x picom

if [ $? -ne 0 ]
then
    picom --unredir-if-possible --experimental-backends
else
    pkill picom
fi
