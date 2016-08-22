FROM nginx
MAINTAINER sinkcup <sinkcup@163.com>
RUN apt-get update -qq
RUN apt-get upgrade -y
RUN mkdir -p /usr/share/nginx/html/portal
ADD . /usr/share/nginx/html/portal/
RUN cd /usr/share/nginx/html/portal/ 
RUN rm -f /etc/nginx/conf.d/*
ADD nginx/conf.d /etc/nginx/conf.d/