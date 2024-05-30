---
title: "Customize Wallpapers for Gnome"
date: Thu Sep 14 2023 00:57:31
type: linux
---

## Why?

So the default gnome Ubuntu 22.04 desktop wallpaper is a Jellyfish.

Classic is the best, but I kind of get tired of jellyfish after nearly a
year, so I decided to try something on my own.

## Variety

So variety is an app in gnome software which can change your background.
The pictures are good, and you can adjust how long the desktop will
change. But it lacks customization, and sometimes I cannot get the
images I want.

## Places I wanted to visit

Recently my interests of visiting places shifted exclusively to the
higher latitudes. I kind of think that the scenery in the lower
latitudes are mediocre. I grew fond of snow and ice, so I listed some
places: \"iceland\" \"saint petersburg\" \"lofoten\" \"norway\"
\"finland\" \"siberia\" \"switzerland\".

## Getting an API on pixabay

So I decided to scrap pixabay for images. When used wget to try to scrap
it returned 403 forbidden, so I changed the userAgent, but it still
returned 403, and I figured it was cloudflare protecting the site.

So I went to the official API page. I searched on github
\"<https://pixabay.com/api/?key=>\" and searched code, getting 2k
results. There are many tokens I found that worked. People left their
tokens in their code, not in env file, which I think is bad practice and
very insecure.

But anyways this is just for fun and not serious.

## Preparations

Set the variables, I decide to keep at most 20 images. When there is
internet I will download the images. The service is in systemctl and it
starts every 5 mins, so like every 5 mins the wallpaper will change, but
only when there is internet connection will the 20 wallpaper images
change.

I used bash script because it looks cool. Python kind of works the same.

```
# Variable Definitions
API_KEY="560162-704dd2880c027f22c62ab7941"
SEARCH_TERMS=("iceland" "saint petersburg" "lofoten" "norway" "finland" "siberia" "switzerland")
USER_AGENT="Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0"
IMAGE_DIR="/home/$USER/Pictures/Wallpapers"
MAX_IMAGES=20
INDEX_FILE="$IMAGE_DIR/current_index.txt"
current_image_count=$(ls -1 "$IMAGE_DIR"/*.jpg 2>/dev/null | wc -l)
```

## First part: delete the leftover wallpapers

Search for the oldest image and delete them (delete until there are less
than 20 images)

    # If there are more than MAX_IMAGES, delete images until we reach MAX_IMAGES
    while [ "$current_image_count" -gt "$MAX_IMAGES" ]; do
        oldest_image=$(ls "$IMAGE_DIR"/*.jpg | sort | head -n 1)
        echo "Deleting oldest image: $oldest_image"
        rm "$oldest_image"
        current_image_count=$(ls -1 "$IMAGE_DIR"/*.jpg 2>/dev/null | wc -l)
    done

## Second part: set the wallpaper

Keep the count in an index file, so I can increase it every time the
thing runs.

    # Set the Wallpaper
    if [ ! -f $INDEX_FILE ]; then
        echo "1" >$INDEX_FILE
    fi
    current_index=$(cat $INDEX_FILE)
    sorted_images=($(ls "$IMAGE_DIR"/*.jpg | sort))

Then after getting the count then sorting the images we get the
corresponding index. After that set the gnome dektop background, then
increase the current_index to make it different next time, and store the
current_index in the index file.

    if [ ${#sorted_images[@]} -gt 0 ]; then
        image_index=$((current_index % ${#sorted_images[@]}))
        next_image="${sorted_images[$image_index]}"

        DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$(id -u $USER)/bus"
        # Set the image as wallpaper using gsettings and set it to 'zoomed' mode
        gsettings set org.gnome.desktop.background picture-uri "file://$next_image"
        gsettings set org.gnome.desktop.background picture-options 'zoom'

        current_index=$((current_index + 17))
        echo $current_index >$INDEX_FILE
    else
        echo "No images found in $IMAGE_DIR"
    fi

## Third part: Download the Wallpaper

Create folder and then choose a random search term. Add %20 to the
search term to replace the blank space(or it won\'t work in the pixabay
API)

    mkdir -p "$IMAGE_DIR"
    exec &>>"$IMAGE_DIR/wallpaper_downloader.log"

    # Choose a random search term
    SEARCH_TERM=${SEARCH_TERMS[$RANDOM % ${#SEARCH_TERMS[@]}]}
    ENCODED_SEARCH_TERM=$(printf '%s' "$SEARCH_TERM" | sed 's/ /%20/g')

Check if there\'s Internet, if there is no internet, then don\'t do
anything.

    # Check for internet connectivity
    wget -q --spider --user-agent="$USER_AGENT" https://google.com

Then if there is internet, we go to pixabay, and fetch the fullhdurl,
then download the image, naming it using timestamps.

You need to specify each entry of the api

```
if [[ $? -eq 0 ]]; then
    API_INFO_URL="https://pixabay.com/api/?key=$API_KEY&q=$ENCODED_SEARCH_TERM&image_type=photo"
    totalHits=$(curl -s "$API_INFO_URL" -H "User-Agent: $USER_AGENT" | jq '.totalHits')
    numPages=$((totalHits / 20 + 1))
    if [[ $totalHits -eq 0 ]]; then
        echo "No images found for $SEARCH_TERM."
        exit 1
    fi

    page_number=$((1 + RANDOM % numPages))
    API_URL="$API_INFO_URL&page=$page_number"
    image_urls=($(curl -s "$API_URL" -H "User-Agent: $USER_AGENT" | jq -r '.hits[].fullHDURL'))
    random_image_url=${image_urls[$RANDOM % ${#image_urls[@]}]}

    if [[ -z "$random_image_url" ]]; then
        echo "No image URL found."
    else
        new_file_name="$IMAGE_DIR/$(date +%s).jpg"
        wget "$random_image_url" -O "$new_file_name" --user-agent="$USER_AGENT"
        echo "Saved image to $new_file_name"
    fi
fi
```

## Conclusion

Recently I felt kind of frustrated with almost everything, and northern
Europe seems appealing to me. I don\'t know what is the meaning of life,
and I cannot figure out so many things. Everything just became more and
more complex.

Anyways, downloading and changing wallpapers is very fun, but I believe
I will soon change back to the classic JellyFish.

## References

- [Pixabay API Documentation](https://pixabay.com/api/docs/)
- [Gsettings Documentation](https://developer.gnome.org/gio/stable/gsettings-tool.html)
