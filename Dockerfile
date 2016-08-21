FROM alpine:latest

MAINTAINER alex <alexwhen@gmail.com> 

RUN apk --update add nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]