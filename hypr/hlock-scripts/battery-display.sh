#!/usr/bin/env bash

battery_formats=("󰂃" "󰁻" "󰁼" "󰁽" "󰁾" "󰁿" "󰂀" "󰂁" "󰂂" "󰁹")
bat_len=${#battery_formats[@]}

capacity=$(cat /sys/class/power_supply/BAT0/capacity)
battery_icon=${battery_formats[0]}

if (( $capacity == 100 )); then
	battery_icon=${battery_formats[bat_len - 1]}
elif (( 90 <= $capacity < 100 )); then
	battery_icon=${battery_formats[bat_len - 2]}
elif (( 70 <= $capacity < 89 )); then
	battery_icon=${battery_formats[bat_len - 4]}
fi

echo "$battery_icon $(cat /sys/class/power_supply/BAT0/capacity)%"
