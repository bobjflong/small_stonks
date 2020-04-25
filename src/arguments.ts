const parseTokens = {
  stocks: "--stocks=",
  duration: "--duration=",
}
const delimeter = ","
const defaultDuration = 5000

type Args = { stocks: string[], duration: number }

const find = (args: string[], identifier: "stocks" | "duration"): string | undefined => {
  const found = args.find(arg => arg.startsWith(parseTokens[identifier]))
  return found?.split(parseTokens[identifier])[1]
}

const parseDuration = (value: string | undefined) => {
  const duration = value ? parseInt(value, 10) : defaultDuration
  return duration && duration > 0 ? duration : defaultDuration
}

const parseStocks = (value: string | undefined) => value?.split(delimeter) || []

const parse = (args: string[]): Args => {
  const stocks = parseStocks(find(args, "stocks"))
  const duration = parseDuration(find(args, "duration"))
  return {
    stocks,
    duration,
  }
}

export { parse, Args }