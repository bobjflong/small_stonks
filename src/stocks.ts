type Price = {
  value: number;
  up: boolean;
} | null

type API = { timeSeries: (query: StockQuery) => Promise<StockResult> }

class StockAPIWrapper {
  stocks: API

  constructor(stocks: API) {
    this.stocks = stocks
  }

  async price(stockName: string): Promise<Price> {
    try {
      const result = await this.stocks.timeSeries({
        symbol: stockName,
        interval: '60min',
        amount: 2
      })
      if (!result[0] || !result[1]) return null
      const close = result[0].close
      const prevClose = result[1].close

      return {
        value: close,
        up: close > prevClose,
      }
    } catch (error) {
      console.error(stockName, error)
      return Promise.reject()
    }
  }
}

export { StockAPIWrapper as StockAPI, Price }
