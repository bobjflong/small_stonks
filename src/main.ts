// Modules to control application life and create native browser window
import {app, Menu, Tray, BrowserWindow} from "electron"
import path from 'path'

let tray
const assetsDirectory = path.join(__dirname, '../assets')
const createTray = () => {
  tray = new Tray(path.join(assetsDirectory, 'sunTemplate.png'))
  tray.on('click', () => {
    console.warn("hello")
  })
  tray.setTitle("MSFT")
  setInterval(() => {
    // tray.setTitle(Math.random().toString())
  })
}

if (app) {
  app.whenReady().then(createTray)
  app.on('window-all-closed', app.quit)
}

const foo = () => "bar"

export { foo }