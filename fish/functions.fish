function convert-mp4 -d "Converts a video into a mp4 format."
    set file_path $argv[1]

    # if this is empty, then we will reuse the first path
    set copy_path $argv[2]

    if test -z $file_path
        echo "No file given"
        return 1
    end

    if test -z $copy_path
        set copy_path $argv[1]
    end

    ffmpeg -i $argv -codec copy "$copy_path".mp4
end

function mkscript -d "Creates a bash script."
    set file_path $argv

    if test $(count $argv) -gt 1
        echo "No support for multiple files... yet"
        return 1
    end

    if test -z $file_path
        echo "No file given"
        return 1
    end

    if test $(echo $argv | awk -F '.' '{print $2}') != sh
        echo "Shell scripts only"
        return 1
    end

    # TODO: make directories to the script. i can do this in bash but it's a bit more complicated in fish (im lazy)

    touch $file_path && chmod 744 $file_path
    echo -e "#!/bin/bash\n\n" >>$file_path
    vim $file_path
end

function wifi-reset -d "Resets the network WiFi."
    set is_connected $(nmcli n con)
    set nic_name $(ip -o -4 route show to default | awk '{print $5}')

    if test $is_connected != full
        echo "Not connected to internet"
        return 1
    end

    set timer 2.5

    nmcli d down $nic_name
    sleep $timer
    nmcli d up $nic_name
end
