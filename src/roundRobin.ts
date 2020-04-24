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
    let newPointer = this.pointer + 1
    if (newPointer >= this.items.length) {
      newPointer = 0
    }
    this.pointer = newPointer
  }
}

export { RoundRobin }
