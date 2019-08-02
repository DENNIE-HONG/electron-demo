# electron + react 练手
## 页面结构
--推荐(home)  
--排行(top)  
--歌单(playlist)  
--电台(djRadio)  
--歌单详情(playlist-detail)  
--电台分类(dj)  
--单台节目(program)  

## 推荐
![home](/img/home.png)
## 排行榜
![top](/img/top.png)
## 歌单
![playlist](/img/playlist.png)
## 电台
![dj](/img/dj.png)
## 歌单详情页
![playlist-detail](/img/playlist-detail.png)
## 电台节目页
![djRadio](/img/djRadio.png)
## 节目详情页
![program](/img/program.png)
  ## 启动步骤：  
  1、
    开发： npm run devServer  
    生产： npm run build  
  2、cd app  
    开发： npm run start  
    生产： npm run build  
## 数据来源是网易云音乐
https://binaryify.github.io/NeteaseCloudMusicApi/  
下载github项目，启动项目。  
请求资源域名localhost:3000（比如）  
在axios的baseUrl里配置localhost:3000

## 遇到的问题

### 1、播放器进度条上的圆点动画
改用translate3d, 变成复合图层，开启硬件加速，避免普通图层的回流/重绘

### 2、使用vanilla-lazyload实现图片懒加载
用版本10以上，否则图片不加载

### 3、react-router改用hash模式

### 4、一定要装eslint-plugin-html, vscode才有提示

### 5、在componentDidMount绑定了原生事件后，记得在WillUnmount解除绑定

### 6、事件
事件bind尽量写在construct里，只绑定一次
需要传参时，用箭头函数

### 7、react-loadable 路由懒加载 .

VSCode配置将token配置到本地: GitHub Token: ebbf6ede267c456e29545cf7c2cf14df6bc845ff
