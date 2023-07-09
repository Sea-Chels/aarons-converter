const { app, BrowserWindow } = require('electron')

require('@electron/remote/main').initialize();

const createWindow = () => {
    // create the browser window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            enableRemoteModule: true,
        }
    })
    win.loadURL('http://localhost:3000')
}

app.on('ready', createWindow);

// quit when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // dock icon is clicked and there are no other windows open 
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
})