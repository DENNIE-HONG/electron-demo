## electron 练手
  启动步骤：
  1、
    开发： npm run devServer
    生产： npm run build
  2、cd app
    开发： npm run start
    生产： npm run build
### 1、数据来源是网易云音乐
https://binaryify.github.io/NeteaseCloudMusicApi/
下载github项目，启动项目。
请求资源域名localhost:3000（比如）
在axios的baseUrl里配置localhost:3000

### 2、播放器进度条上的圆点动画
改用translate3d, 变成复合图层，开启硬件加速，避免普通图层的回流/重绘

### 3、使用vanilla-lazyload实现图片懒加载
用版本10以上，否则图片不加载

### 4、react-router改用hash模式

### 5、一定要装eslint-plugin-html, vscode才有提示

### 6、在componentDidMount绑定了原生事件后，记得在WillUnmount解除绑定

### 7、事件
事件bind尽量写在construct里，只绑定一次
需要传参时，用箭头函数

### 8、react-loadable 路由懒加载 . 

VSCode配置将token配置到本地: 96b44732649ec1a7d520fe6b1bf6d4599008ea53
