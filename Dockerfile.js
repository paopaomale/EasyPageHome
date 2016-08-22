FROM alpine:latest

MAINTAINER alex <alexwhen@gmail.com> 

RUN apk --update add nginx

COPY EasyInvest-H5 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]