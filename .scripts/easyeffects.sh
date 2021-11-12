#!/bin/sh

sleep 3

easyeffects --gapplication-service &
pamixer --source $(pamixer --list-sources | awk '/Blue/ {print $1}') --set-volume 40
