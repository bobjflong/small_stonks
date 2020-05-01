import {nativeImage, shell} from "electron"
import {Args} from "./arguments"
import {RoundRobin} from "./roundRobin"
import {Tray as ElectronTray} from "electron"
import { Price, StockAPI } from "./stocks"
import Stocks from "stocks.js"
import path from "path"

let tray: ElectronTray
let stockToVisit: string = ""
const stocks: { [key: string]: Price } = {}

const formatPriceDisplay = (stock: string, price: Price) => {
  let priceDisplay
  switch(price) {
    case null: {
      priceDisplay = "no data"
      break
    }
    case price: {
      priceDisplay = `\$${price?.value}`
    }
  }
  return stock ? `${stock.padEnd(5, '  ')} ${priceDisplay}` : ""
}

const leadingInterval = (fn: Function, timeout: number) => {
  fn()
  return setInterval(fn, timeout)
}

const images = {
  "up": path.join(__dirname, '../assets/up.png'),
  "down": path.join(__dirname, '../assets/down.png')
}

const getInstance = (args: Args) => {
  const stockAPI = new StockAPI(new Stocks(args.apiKey))
  const roundRobin = new RoundRobin(args.stocks, stockAPI)
  tray = new ElectronTray(nativeImage.createEmpty())

  tray.on('click', () => {
    shell.openExternal(`https://finance.yahoo.com/quote/${stockToVisit}`)
  })

  leadingInterval(() => {
    roundRobin.next().then(p => {
      if (!p.result && stocks[p.item]) {
        tray.setTitle(formatPriceDisplay(p.item, stocks[p.item]))
        tray.setImage(images[stocks[p.item]?.up ? "up" : "down"]) // TODO: clean up duplication here
      } else {
        stockToVisit = p.item
        if (p.result) stocks[stockToVisit] = p.result
        tray.setTitle(formatPriceDisplay(stockToVisit, p.result))
        tray.setImage(images[p.result?.up ? "up" : "down"])
      }
    }).catch(() => {})
  }, args.duration)

  return tray
}

export {getInstance}
