#!/usr/bin/env bash

pgrep -x albert
if [ $? -ne 0 ]
then
    albert
    sleep 1
fi

albert show
