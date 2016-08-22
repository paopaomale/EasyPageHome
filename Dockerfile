FROM alpine:latest

MAINTAINER paopaopc <paopaomale@gmail.com> 

RUN apk --update add nginx

COPY EasyInvest-H5 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]