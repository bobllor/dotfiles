#!/usr/bin/env bash

# util functions for the script.
source ~/.config/hypr/hlock-scripts/support/battery/utils.sh

battery_formats=("󰂃" "󰁻" "󰁼" "󰁽" "󰁾" "󰁿" "󰂀" "󰂁" "󰂂" "󰁹")
bat_len=${#battery_formats[@]}

capacity=$(cat /sys/class/power_supply/BAT0/capacity)
battery_icon=${battery_formats[$bat_len - 1]}

battery_status=$(cat /sys/class/power_supply/BAT0/status)

# check if charging
if [[ $battery_status == Full ]]; then
  temp=''
elif [[ $battery_status == Charging ]]; then
  temp=''
elif [[ $battery_status == Discharging ]]; then
  temp=''
fi

# i know...
if [[ $(capacity_between $capacity 100 80) == 0 ]]; then
  battery_icon=${battery_formats[bat_len - 1]}
elif [[ $(capacity_between $capacity 80 65) == 0 ]]; then
  battery_icon=${battery_formats[bat_len - 2]}
elif [[ $(capacity_between $capacity 65 51) == 0 ]]; then
  battery_icon=${battery_formats[bat_len - 3]}
elif [[ $(capacity_equals $capacity 50) == 0 ]]; then
  # half way mark
  battery_icon=${battery_formats[bat_len - 5]}
elif [[ $(capacity_between $capacity 49 30) == 0 ]]; then
  battery_icon=${battery_formats[bat_len - 6]}
fi

echo "$battery_icon $(cat /sys/class/power_supply/BAT0/capacity)%"
