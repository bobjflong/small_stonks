import { nativeImage, shell, Tray } from "electron"
import { Args } from "./arguments"
import { RoundRobin } from "./roundRobin"
import { Tray as ElectronTray } from "electron"
import { Price, StockAPI } from "./stocks"
import Stocks from "stocks.js"
import path from "path"

let tray: ElectronTray
let stockToVisit = ""
const stocks: { [key: string]: Price } = {}

const formatPriceDisplay = (stock: string, price: Price): string => {
  const priceDisplay = price ? `$${price.value}` : "no data"
  return `${stock.padEnd(5, '  ')} ${priceDisplay}`
}

const leadingInterval = (fn: Function, timeout: number): number => {
  fn()
  return setInterval(fn, timeout)
}

const images = {
  "up": path.join(__dirname, '../assets/up.png'),
  "down": path.join(__dirname, '../assets/down.png')
}

const updateTray = (tray: Tray, item: string, price: Price): void => {
  tray.setTitle(formatPriceDisplay(item, price))
  tray.setImage(images[price?.up ? "up" : "down"])
}

const getInstance = (args: Args): Tray => {
  const stockAPI = new StockAPI(new Stocks(args.apiKey))
  const roundRobin = new RoundRobin(args.stocks, stockAPI)
  tray = new ElectronTray(nativeImage.createEmpty())

  tray.on('click', () => {
    shell.openExternal(`https://finance.yahoo.com/quote/${stockToVisit}`)
  })

  leadingInterval(() => {
    roundRobin.next().then(p => {
      stockToVisit = p.item
      if (p.result) stocks[stockToVisit] = p.result

      updateTray(tray, p.item, p.result || stocks[p.item] || null)
    }).catch(() => { /* do nothing */ })
  }, args.duration)

  return tray
}

export {getInstance}
