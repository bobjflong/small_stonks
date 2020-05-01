import {nativeImage, shell} from "electron"
import {Args} from "./arguments"
import {RoundRobin} from "./roundRobin"
import {Tray as ElectronTray} from "electron"
import { Price, StockAPI } from "./stocks"
import Stocks from "stocks.js"

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
      priceDisplay = `\$${price}`
    }
  }
  return stock ? `${stock} ${priceDisplay}` : ""
}

const leadingInterval = (fn: Function, timeout: number) => {
  fn()
  return setInterval(fn, timeout)
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
      } else {
        stockToVisit = p.item
        if (p.result) stocks[stockToVisit] = p.result
        tray.setTitle(formatPriceDisplay(stockToVisit, p.result))
      }
    }).catch(() => {})
  }, args.duration)

  return tray
}

export {getInstance}
