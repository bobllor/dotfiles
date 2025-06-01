#!/bin/bash

# checks if the current capacity is in between two values.
capacity_between() {
  capacity=$1
  high_val=$2
  low_val=$3

  if (($low_val <= $capacity && capacity < $high_val)); then
    echo 0
  else
    echo 1
  fi
}

# checks if the current capacity is equal to the given value.
capacity_equals() {
  capacity=$1
  val=$2

  if (($capacity == $val)); then echo 0; else echo 1; fi
}
