#!/bin/bash

theme(){
	img_path=$1

	if [[ $img_path == '' ]]; then
		echo "Canceled"
		return 1
	fi

	# this is probably good enough. might need to add more but it depends.
	if [[ ! $img_path =~ \.(jpg|jpeg|png|webp) ]]; then
		echo "Wrong file"
		return 1
	fi

	# probably do something with resizing? depends on the situation.
	# the laptop this is experimented on it works, but my main computer
	# or other laptop will share the same result.
	swww img --resize crop $img_path
}

theme $(yad --width 800 --height 500 --file)
