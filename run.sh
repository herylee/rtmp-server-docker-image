#####################################
#
# 
# Author: Joshua Shaw
# Date:   2016/09/13
#
#####################################

#!/bin/bash

docker run -d \
           --add-host core1.live.cloud.tv:172.18.216.86 \
           --add-host edge1.live.cloud.tv:172.18.216.101 \
           --add-host edge2.live.cloud.tv:172.18.216.152 \
           -p 80:80 -p 1935:1935 \
           -v `pwd`/nginx/logs:/home/live/nginx/logs \
           -v `pwd`/nginx/tmp:/home/live/nginx/tmp   \
           -v `pwd`/nginx/html:/home/live/nginx/html \
           -v `pwd`/nginx/conf:/home/live/nginx/conf \
              nginx-rtmp-http:0.10

           
