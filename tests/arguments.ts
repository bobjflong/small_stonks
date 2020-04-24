import { parse } from "../src/arguments"
import { expect } from "chai"

describe("parse", () => {
  it("parses nothing", () => {
    expect(parse([])).to.deep.equal({
      stocks: [],
    })
  })
  it("parses a stock", () => {
    expect(parse(["foo", "bar", "--stocks=MSFT"])).to.deep.equal({
      stocks: ["MSFT"],
    })
  })
  it("parses stocks", () => {
    expect(parse(["foo", "bar", "--stocks=MSFT,TWLO"])).to.deep.equal({
      stocks: ["MSFT", "TWLO"],
    })
  })
})