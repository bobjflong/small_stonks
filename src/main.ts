// Modules to control application life and create native browser window
import {app, Menu, BrowserWindow} from "electron"
import { parse, Args } from "./arguments"
import { getInstance } from "./tray"

const createTray = (args: Args) => getInstance(args)

if (app) {
  app.whenReady().then(() => createTray(parse(process.argv)))
  app.on('window-all-closed', app.quit)
}
