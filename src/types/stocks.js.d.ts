
type StockQuery = {
  symbol: string;
  interval: string;
  amount: number;
}
type StockResult = Array<{close: number}>

declare class Stocks {
  constructor(apiKey: string)
  timeSeries(query: StockQuery): Promise<StockResult>
}

declare module "stocks.js" {
  export = Stocks
}
