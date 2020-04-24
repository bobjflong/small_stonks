import { parse } from "../src/arguments"
import { expect } from "chai"

describe("parse", () => {
  it("parses nothing", () => {
    expect(parse([])).to.deep.include({
      stocks: [],
    })
  })
  it("parses a stock", () => {
    expect(parse(["foo", "bar", "--stocks=MSFT"])).to.deep.include({
      stocks: ["MSFT"],
    })
  })
  it("parses stocks", () => {
    expect(parse(["foo", "bar", "--stocks=MSFT,TWLO"])).to.deep.include({
      stocks: ["MSFT", "TWLO"],
    })
  })
  it("adds a default duration", () => {
    expect(parse(["foo", "bar", "--stocks=MSFT,TWLO"])).to.deep.include({
      duration: 5000,
    })
  })
  it("parses a duration", () => {
    expect(parse(["foo", "bar", "--duration=1234"])).to.deep.include({
      duration: 1234,
    })
  })
  it("handles an invalid duration", () => {
    expect(parse(["foo", "bar", "--duration=foo"])).to.deep.include({
      duration: 5000,
    })
  })
  it("handles a zero duration", () => {
    expect(parse(["foo", "bar", "--duration=0"])).to.deep.include({
      duration: 5000,
    })
  })
})