FROM node:latest
MAINTAINER Daniel Levitt <daniellevitt86@gmail.com>

LABEL Description="This hosts the user Javascript & CSS files"

# Install Nginx
RUN apt-get update
RUN apt-get install -y nano wget dialog net-tools
RUN apt-get install -y nginx

# Use package.json to help cache npm dependencies
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# Add application code & bundle
WORKDIR /opt/app
ADD . /opt/app
RUN npm run bundle

# Nginx
RUN rm -v /etc/nginx/nginx.conf
RUN cp -a /opt/app/nginx.conf /etc/nginx/nginx.conf
RUN cp -a /opt/app/public/* /usr/share/nginx/html

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 80

CMD service nginx start
