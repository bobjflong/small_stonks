import { RoundRobin } from "../src/roundRobin"
import { expect } from "chai"

describe("RoundRobin", () => {
  it("initializes with an empty list of items", () => {
    expect(
      () => new RoundRobin([])
    ).not.to.throw()
  })
  it("returns nothing if the queue is empty", () => {
    const rr = new RoundRobin([])
    expect(rr.next()).to.equal(null)
    expect(rr.next()).to.equal(null)
    expect(rr.next()).to.equal(null)
  })
  it("returns the next item in the queue", () => {
    const rr = new RoundRobin(["MSFT", "TWLO", "SPY"])
    expect(rr.next()).to.equal("MSFT")
    expect(rr.next()).to.equal("TWLO")
    expect(rr.next()).to.equal("SPY")
    expect(rr.next()).to.equal("MSFT")
  })
})