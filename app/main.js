const { app, BrowserWindow } = require('electron');
const path = require('path');
function createWindow () {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    resizable: false,
    maximizable: false,
    backgroundColor: '#00FFFFFF',
  });
  // 加载应用页面
  win.loadFile('index.html');
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
    app.quit()
  }
});
