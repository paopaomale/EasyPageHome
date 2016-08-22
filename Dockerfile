FROM alpine:latest

MAINTAINER paopaopc <paopaomale@gmail.com> 

RUN apk --update add nginx
RUN sudo nginx -c /usr/local/etc/nginx/nginx.conf
RUN sudo nginx -s reload

COPY EasyInvest-H5 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

