const Binance = require('node-binance-api');

// binance testnet only
const binance = new Binance().options({
  APIKEY: 'jCQzTbeFTMsC88SsFbAvdWwiOFBq6urusj0BILJfj3zWmyFuTw52X7XjsH5FxrYE',
  APISECRET: 'SxNh2UjoE32mG4fgmcSZezdMQLqUINj6MxdWjzoJZZTQDAgeif93GMRu8ahPuBRh',
  test: true
});

const example = async function() {
    // API: get last 60 1min candles of BNBUSDT
    let ticks = await binance.candlesticks("BNBUSDT", "1m", null, {limit: 60, endTime: Date.now()})

    // get the close price of the last 20min candle
    let closePrice = getLastNthClosePrice(ticks, 20);
    console.info(`last 20min close Price of BNB: ${closePrice}`)

    // API: get current price of BNBUSDT
    let ticker = await binance.prices('BNBUSDT');
    console.info(`current Price of BNB: ${ticker.BNBUSDT}`);

    console.info(`--------------------`)
    if (ticker.BNBUSDT > closePrice) {
        console.info(`current price > history price, BUY`)
    } else {
        console.info(`current price <= history price, SELL `)
    }
}

function getLastNthClosePrice(ticks, number) {
    let nthTick = ticks[ticks.length - number];
    let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = nthTick;

    return close;
}

example()