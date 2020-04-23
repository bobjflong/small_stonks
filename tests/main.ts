import { expect } from "chai"
import { foo } from "../src/main"

describe("foo", () => {
  it("bars", () => {
    expect(foo()).to.equal("bar")
  })
})