const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

// 关闭安全警告
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
function createWindow () {
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 1000,
    height: 800,
    transparent: true,
    resizable: false,
    maximizable: false,
    backgroundColor: '#00FFFFFF',
  });
  let Url;
  if (isDev) {
    Url = url.format({
      pathname: path.join('localhost:2222'),
      protocol: 'http',
      slashes: true
    });
  } else {
    Url = `file://${__dirname}/dist/index.html`;
  }
  // 加载应用页面
  win.loadURL(Url);
  // 打开开发者工具
  win.webContents.openDevTools();

  // 关闭
  win.on('closed', () => {
    win = null;
  });
}
app.on('ready', createWindow);
// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
