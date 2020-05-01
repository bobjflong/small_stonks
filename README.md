# smallStonks

A very small menu-bar application for macOS, which ticks through a list of stock symbols, giving their current price. This app is implemented with Typescript and Electron.

# Gif

<img src="example.gif">

# Usage

Requires a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)

```
yarn start --stocks=MSFT,TWLO,SPY,AAPL --apiKey=<api key>
```

The `--duration` parameter is also supported, to change how long each price is displayed for. However free Alpha Vantage accounts have low rate limits, so YMMV in terms of accuracy. The app will try to fall back to a previous price if none is returned by the API.

# Warning

Please don't use this app for anything important, or making important decisions 🙄I cannot vouch for accuracy or errors.