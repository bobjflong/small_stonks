const stocksArgName = "--stocks="
const durationArgName = "--duration="
const delimeter = ","
const defaultDuration = 5000

type Args = { stocks: string[], duration: number }

const find = (args: string[], identifier: string): string | undefined => {
  const found = args.find(arg => arg.startsWith(identifier))
  return found?.split(identifier)[1]
}

const parseDuration = (value: string | undefined) => {
  const duration = value ? parseInt(value, 10) : defaultDuration
  return duration && duration > 0 ? duration : defaultDuration
}

const parse = (args: string[]): Args => {
  const stocks = find(args, stocksArgName)?.split(delimeter) || []
  const duration = parseDuration(find(args, durationArgName))
  return {
    stocks,
    duration,
  }
}

export { parse }