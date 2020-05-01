type Price = number | null

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
        amount: 1
      })
      if (!result[0]) return null

      return result[0].close
    } catch (error) {
      console.error(stockName, error)
      return Promise.reject()
    }
  }
}

export { StockAPIWrapper as StockAPI, Price }