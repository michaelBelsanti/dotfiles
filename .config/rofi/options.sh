#!/usr/bin/env bash
uptime=$(uptime -p | sed -e 's/up //g')
theme="~/.config/rofi/options.rasi"
msg_theme="~/.config/rofi/confirm.rasi"
rofi_command="rofi -theme $theme"
msg_command="rofi -theme $msg_theme"

# Options
shutdown=" shutdown"
reboot=" reboot"
logout=" logout"
suspend="  suspend"
lock=" lock"

# Confirmation
confirm_exit() {
	echo -e "yes\nno" | $msg_command -dmenu\
		-p "Are You Sure? : "\
		-theme $msg_theme
}

# Variable passed to rofi
options="$shutdown\n$reboot\n$logout\n$lock\n$suspend"

chosen="$(echo -e "$options" | $rofi_command -p "Uptime: $uptime" -dmenu -selected-row 2)"
case $chosen in
    $shutdown)
		ans=$(confirm_exit &)
		if [[ $ans == "yes" || $ans == "YES" || $ans == "y" || $ans == "Y" ]]; then
			shutdown now
		fi
        ;;
    $reboot)
		ans=$(confirm_exit &)
		if [[ $ans == "yes" || $ans == "YES" || $ans == "y" || $ans == "Y" ]]; then
	   		sudo reboot
		fi
        ;;
    $lock)
	    	betterlockscreen --off 30 -l dimblur
        ;;
    $suspend)
		ans=$(confirm_exit &)
		if [[ $ans == "yes" || $ans == "YES" || $ans == "y" || $ans == "Y" ]]; then
			systemctl suspend
		fi
        ;;
    $logout)
		ans=$(confirm_exit &)
		if [[ $ans == "yes" || $ans == "YES" || $ans == "y" || $ans == "Y" ]]; then
			pkill $(wmctrl -m | awk 'NR == 1 { print $2 }')
        fi
        ;;
esac
