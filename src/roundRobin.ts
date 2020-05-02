import { Price, StockAPI } from "./stocks"
type Fetched = {
  item: string;
  result: Price;
}

class RoundRobin {
  items: string[]
  pointer: number
  stockAPI: StockAPI

  constructor(items: string[], stockAPI: StockAPI) {
    this.items = items
    this.pointer = 0
    this.stockAPI = stockAPI
  }

  async next(): Promise<Fetched> {
    const item = this.items[this.pointer]
    if (!item) return Promise.reject()

    return this.stockAPI.price(item).then(result => {
      this.increment()
      return { item, result }
    })
  }

  increment(): void {
    const incremented = this.pointer + 1
    this.pointer = incremented >= this.items.length ? 0 : incremented
  }
}

export { RoundRobin }
