const path = require("path");

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

require('./express-server/server.js');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    minWidth: 900,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.maximize();

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      //: `file://${path.join(__dirname, "../build/index.html")}`
      : "http://localhost:4000/static/index.html"
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.setMenuBarVisibility(false)
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

