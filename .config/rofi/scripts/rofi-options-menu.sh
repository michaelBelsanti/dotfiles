#!/usr/bin/env bash

SCRIPT_DIR=$(dirname $(realpath $0))

SLEEP=""
LOGOUT=""
RESTART=""
SHUTDOWN=""

list_icons() {
    echo $SLEEP
    echo $LOGOUT
    echo $RESTART
    echo $SHUTDOWN
}

handle_option() {
    case "$1" in
        "$SLEEP")
            if $($SCRIPT_DIR/rofi-confirm.sh "Confirm suspend"); then
                betterlockscsreen -l &
                systemctl suspend
            fi
            ;;
        "$LOGOUT")
            if $($SCRIPT_DIR/rofi-confirm.sh "Confirm logout"); then
                i3-msg exit
            fi
            ;;
        "$RESTART")
            if $($SCRIPT_DIR/rofi-confirm.sh "Confirm reboot"); then
                reboot
            fi
            ;;
        "$SHUTDOWN")
            if $($SCRIPT_DIR/rofi-confirm.sh "Confirm shutdown"); then
                shutdown now
            fi
            ;;
    esac
}

{
    SELECTION="$(list_icons | rofi -dmenu -theme options-menu)"
    handle_option $SELECTION &
    sleep 0.05
    wait $!
} &
sleep 0.05
