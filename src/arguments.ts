const stocksArgName = "--stocks="

type Args = { stocks: string[] }

const parse = (args: string[]): Args => {
  const stocks = args.find(arg => arg.startsWith(stocksArgName))
  return {
    stocks: stocks?.split(stocksArgName)[1]?.split(",") || []
  }
}

export { parse }