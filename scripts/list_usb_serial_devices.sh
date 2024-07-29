#!/bin/bash

for dev in $(ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null); do
    echo "Device: $dev"
    udevadm info -q property -n $dev | grep -E 'ID_MODEL=|ID_VENDOR='
done
