# cybertron_reader

##简介
reader的主要功能是用于解析app的配置，生成预期的页面。使用固定端口1111启动服务，因为要在editor上使用reader。

reader兼备模拟器，微信和app端的功能，通过加载不同的虚拟路由去处理不同的业务。

## start
`npm install dva-cli -g`安装cli，这里用的是dva。

`npm install`安装依赖。

`npm start`运行。

## build
`npm run build`编译。

## docker
构建
```
sudo docker build . -t daocloud.io/gizwits2015/cybertron_reader
```
运行
```
sudo docker run -it -p 1111:1111 daocloud.io/gizwits2015/cybertron_reader
```