#!/usr/bin/env bash

# util functions for the script.
source ~/.config/hypr/hlock-scripts/support/battery/utils.sh

battery_formats=("󰂃" "󰁻" "󰁼" "󰁽" "󰁾" "󰁿" "󰂀" "󰂁" "󰂂" "󰁹")
bat_len=${#battery_formats[@]}

capacity=$(cat /sys/class/power_supply/BAT0/capacity)
battery_icon=${battery_formats[0]}

battery_status=$(cat /sys/class/power_supply/BAT0/status)

# check if charging
if [[ $battery_status == Full ]]; then
  temp=''
elif [[ $battery_status == Chagring ]]; then
  temp=''
elif [[ $battery_status == Discharging ]]; then
  temp=''
fi

# i know...
if [[ $(capacity_equals $capacity 100) == 0 ]]; then
  # full battery
  battery_icon=${battery_formats[bat_len - 1]}
elif [[ $(capacity_between $capacity 100 90) == 0 ]]; then
  battery_icon=${battery_formats[bat_len - 2]}
elif [[ $(capacity-between $capacity 90 75) == 0 ]]; then
  battery_icon=${battery_formats[bat_len - 3]}
elif [[ $(capacity-between $capacity 75 51) == 0 ]]; then
  battery_icon=${battery_formats[bat_len - 4]}
elif [[ $(capacity_equals $capacity 50) == 0 ]]; then
  # half way mark
  battery_icon=${battery_formats[bat_len - 5]}
fi

echo "$battery_icon $(cat /sys/class/power_supply/BAT0/capacity)%"
