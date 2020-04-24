// Modules to control application life and create native browser window
import {app, Menu, Tray, BrowserWindow} from "electron"
import { parse } from "./arguments"
import { RoundRobin } from "./roundRobin"
import path from 'path'

let tray: Tray
const logo = path.join(__dirname, '../assets/logo.png')

const createTray = (roundRobin: RoundRobin) => {
  tray = new Tray(logo)
  tray.on('click', () => {
    console.warn("hello")
  })
  tray.setTitle(roundRobin.next() || "")
  setInterval(() => {
    tray.setTitle(roundRobin.next() || "")
  }, 1000)
}

if (app) {
  const roundRobin = new RoundRobin(parse(process.argv).stocks)

  app.whenReady().then(() => createTray(roundRobin))
  app.on('window-all-closed', app.quit)
}

const foo = () => "bar"

export { foo }