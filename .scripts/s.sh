
bool=1

while [ $bool -eq 1 ]
do
    running=$(pgrep -l easyeffects | awk '/easyeffects$/ {printf $2}')
    if [[ $running == 'easyeffects' ]]
    then
        bool=0
        echo shid
    fi
done

