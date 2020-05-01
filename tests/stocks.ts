import { expect } from "chai"

import { StockAPI } from "../src/stocks"

const withTimeseries = {
  timeSeries: (params: any) => {
    if (params.symbol === "MSFT") {
      return Promise.resolve([
        { close: 1234 }
      ])
    } else {
      return Promise.resolve([])
    }
  }
}

describe("price", () => {
  it("returns the last close price", async () => {
    const api = new StockAPI(withTimeseries)

    const price = await api.price("MSFT")

    expect(price).to.equal(1234)
  })

  it("returns null if no data is found", async () => {
    const api = new StockAPI(withTimeseries)

    const price = await api.price("TWLO")

    expect(price).to.equal(null)
  })
})