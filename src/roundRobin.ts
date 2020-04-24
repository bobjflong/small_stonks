class RoundRobin {
  items: string[]
  pointer: number

  constructor(items: string[]) {
    this.items = items
    this.pointer = 0
  }

  next() {
    const item = this.items[this.pointer]
    this.increment()
    return item || null
  }

  increment() {
    const incremented = this.pointer + 1
    this.pointer = incremented >= this.items.length ? 0 : incremented
  }
}

export { RoundRobin }
