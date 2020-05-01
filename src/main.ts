// Modules to control application life and create native browser window
import { app } from "electron"
import { parse, Args } from "./arguments"
import { getInstance } from "./tray"

const createTray = (args: Args): Electron.Tray => getInstance(args)

if (app) {
  app.whenReady().then(() => createTray(parse(process.argv)))
  app.on('window-all-closed', app.quit)
}
