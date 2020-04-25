import {nativeImage, shell} from "electron"
import {Args} from "./arguments"
import {RoundRobin} from "./roundRobin"
import {Tray as ElectronTray} from "electron"

let tray: ElectronTray

const getInstance = (args: Args) => {
  const roundRobin = new RoundRobin(args.stocks)
  tray = new ElectronTray(nativeImage.createEmpty())
  tray.setTitle(roundRobin.next() || "")

  tray.on('click', () => {
    console.warn("hello")
    shell.openExternal('https://example.com/')
  })
  
  setInterval(() => {
    tray.setTitle(roundRobin.next() || "")
  }, args.duration)

  return tray
}

export {getInstance}
