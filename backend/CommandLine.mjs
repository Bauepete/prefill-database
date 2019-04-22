export class CommandLine {
  constructor(line) {
    this.line = line
    this.arguments = line.slice(2)
    this.currentArgument = 0
  }

  get count() {
    return this.arguments.length
  }

  *[Symbol.iterator]() {
    while (this.currentArgument < this.count) {
      yield this.arguments[this.currentArgument++]
    }
  }

  forEach(func) {
    let i = 0
    for (const currentValue of this) {
      func(currentValue, i, this.arguments)
      i++
    }
  }

  getElement(index) {
    return this.arguments[index]
  }
}
