################################
#
# Nginx-rtmp-http Dockerfile
#
# Author: Joshua Shaw
# Date:   2016/09/13
#
################################

FROM ubuntu:14.04

MAINTAINER Joshua Shaw <joshuashaw@foxmail.com>

ENV AP /home/live/nginx

RUN apt-get -y update 
RUN apt-get -y install libxml2 
RUN apt-get -y install libxslt1.1

RUN useradd live -u 1000 -s /bin/bash
USER live 

VOLUME ["/home/live/nginx/conf", "/home/live/nginx/html", "/home/live/nginx/tmp", "/home/live/nginx/logs"]

ADD ./nginx/ $AP/

WORKDIR /home/live/nginx/sbin

EXPOSE 8080 
EXPOSE 1935

CMD ["./nginx", "-g", "daemon off;"]


