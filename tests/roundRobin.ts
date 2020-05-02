import { RoundRobin } from "../src/roundRobin"
import { expect } from "chai"
import { StockAPI } from "../src/stocks"

const api: StockAPI = {
  price: () => Promise.resolve({ value: 1, up: true }),
  stocks: null
}

describe("RoundRobin", () => {
  it("initializes with an empty list of items", () => {
    expect(
      () => new RoundRobin([], api)
    ).not.to.throw()
  })
  it("returns nothing if the queue is empty", done => {
    const rr = new RoundRobin([], api)
    rr.next().catch(() => {
      done()
    })
  })
  it("returns the next item in the queue", done => {
    const rr = new RoundRobin(["MSFT", "TWLO", "SPY"], api)
    rr.next().then(r => {
      expect(r.item).to.equal("MSFT")
      rr.next().then(r => {
        expect(r.item).to.equal("TWLO")
        rr.next().then(r => {
          expect(r.item).to.equal("SPY")
          rr.next().then(r => {
            expect(r.item).to.equal("MSFT")
            done()
          })
        })
      })
    })
  })
})
