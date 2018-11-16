const { app, BrowserWindow } = require('electron');
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