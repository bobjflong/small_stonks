const parseTokens = {
  stocks: "--stocks=",
  duration: "--duration=",
  apiKey: "--apiKey=",
}
const delimeter = ","
const defaultDuration = 10000

type Args = {
  stocks: string[];
  duration: number;
  apiKey: string;
}

const find = (args: string[], identifier: "stocks" | "duration" | "apiKey"): string | undefined => {
  const found = args.find(arg => arg.startsWith(parseTokens[identifier]))
  return found?.split(parseTokens[identifier])[1]
}

const parseDuration = (value: string | undefined): number => {
  const duration = value ? parseInt(value, 10) : defaultDuration
  return duration && duration > 0 ? duration : defaultDuration
}

const parseStocks = (value: string | undefined): string[] => value?.split(delimeter) || []

const parse = (args: string[]): Args => {
  const stocks = parseStocks(find(args, "stocks"))
  const duration = parseDuration(find(args, "duration"))
  const apiKey = find(args, "apiKey") || ""

  return {
    stocks,
    duration,
    apiKey
  }
}

export { parse, Args }
