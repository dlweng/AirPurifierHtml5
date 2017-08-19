FROM daocloud.io/gizwits2015/g-node-with-nginx-image:latest

WORKDIR /app
ADD package.json /app/
RUN npm install
ADD . /app/
RUN npm run build && \
    cp -R /app/dist/*  /usr/share/nginx/html && \
    cat /app/theNginx.conf > /etc/nginx/conf.d/default.conf && \
    rm -rf /app

ENTRYPOINT ["nginx", "-g","daemon off;"]