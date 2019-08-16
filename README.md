# electron + react 练手
## 页面结构
--推荐(home)  
--排行(top)  
--歌单(playlist)  
--电台(djRadio)  
--歌单详情(playlist-detail)  
--电台分类(dj)  
--单台节目(program)  
--单曲页(song)  
--专辑页(album)  

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
## 歌曲详情页
![song](/img/song.png)
## 专辑页
![alum](/img/album.png)
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
注意：直接引入用的是es6版本,vanilla-lazyload.min.js才是es5版本

### 3、react-router改用hash模式

### 4、一定要装eslint-plugin-html, vscode才有提示

### 5、在componentDidMount绑定了原生事件后，记得在WillUnmount解除绑定

### 6、事件
事件bind尽量写在construct里，只绑定一次
需要传参时，用箭头函数

### 7、react-loadable 路由懒加载 .  

### 8、uglifyjs-webpack-plugin 最新版无法压缩js，且会报错
问题： https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/206  
解决：使用1.x版本

### 9、注意PureComponent只做prop的浅比较

### 10、React之setState调用unmount组件报警告
问题：轮播组件的上一页下一页按钮是调用CarouselBox的静态方法  
页面销毁后又回到首页，翻页按钮报错。  
解决：跳页后又回来调用的不是CarouselBox新实例，而是旧的
错误写法：
```
CarouselBox.next = CarouselBox.next.bind(this);
CarouselBox.prev = CarouselBox.prev.bind(this);
```

修正：
```
CarouselBox.next = this.showNext.bind(this);
CarouselBox.prev = this.showPrev.bind(this);
```




VSCode配置将token配置到本地: GitHub Token: ebbf6ede267c456e29545cf7c2cf14df6bc845ff
