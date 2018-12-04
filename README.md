electron 练手
###1、数据来源是网易云音乐
https://binaryify.github.io/NeteaseCloudMusicApi/
下载github项目，启动项目。
本地开发利用proxy，代理到localhost:3000（比如）

###2、播放器进度条上的圆点动画
改用translate3d, 变成复合图层，开启硬件加速，避免普通图层的回流/重绘

###3、使用react-lazyload实现图片懒加载
