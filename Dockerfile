#Build java web app container image

FROM docker.cn/docker/ubuntu:14.04

MAINTAINER chenchanghui<nuccch2010.163.com>

#Make java and tomcat install directory

RUN mkdir /usr/local/java

RUN mkdir /usr/local/tomcat

#Copy jre and tomcat into image

ADD jre1.8.0_31 /usr/local/java/

ADD apache-tomcat-6.0.35 /usr/local/tomcat/

ADD start_tomcat.sh start_tomcat.sh

#Expose http port

EXPOSE 8080