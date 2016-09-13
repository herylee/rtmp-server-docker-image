################################
#
# Nginx-rtmp-http docker image
# Author: Joshua Shaw
# Date:   2016/09/13
#
################################

FROM ubuntu:14.04

MAINTAINER Joshua Shaw <joshuashaw@foxmail.com>

USER root 

ENV AP /home/live/nginx

RUN apt-get -y update 
RUN apt-get -y install libxml2 
RUN apt-get -y install libxslt1.1

VOLUME ["/home/live/nginx/conf", "/home/live/nginx/html", "/home/live/nginx/tmp", "/home/live/nginx/logs"]

ADD ./nginx/ $AP/

WORKDIR /home/live/nginx/sbin

EXPOSE 80
EXPOSE 1935

CMD ["./nginx", "-g", "daemon off;"]


