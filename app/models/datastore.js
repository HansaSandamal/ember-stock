import EmberObject from '@ember/object';
import Stock from './stock';

export default EmberObject.extend({
  stocks: [],
  stocksByExchange: new Map(),
  createdStocks: new Map(),

  addStock(stock) {
    this.stocks.push(stock);
    const exchangeStocks = this.stocksByExchange.get(stock.exchange) || [];
    exchangeStocks.push(stock);
    this.stocksByExchange.set(stock.exchange, exchangeStocks);
  },

  generateStocks() {
    const tdwlSymbols = [1010, 1020, 1090, 2040, 1040];
    tdwlSymbols.forEach((symbol) => {
      const stock = this.getOrCreateStock(symbol, 'TDWL');
      this.addStock(stock);
    });

    const dfmSymbols = ['EMAAR', 'DFM', 'DIB', 'SHUAA', 'UPP'];
    dfmSymbols.forEach((symbol) => {
      const stock = this.getOrCreateStock(symbol, 'DFM');
      this.addStock(stock);
    });

    this.startUpdates();
  },

  startUpdates() {
    const update = () => {
      this.stocks.forEach((stock) => {
        stock.setProperties({
          open: Math.random() * 100,
          high: Math.random() * 100,
          low: Math.random() * 100,
          close: Math.random() * 100,
          bid: Math.random() * 100,
          ask: Math.random() * 100,
          tradeDate: new Date(),
        });
      });

      setTimeout(update, 5000);
    };

    setTimeout(update, 5000);
  },

  getStocksByExchange(exchange) {
    return this.stocksByExchange.get(exchange) || [];
  },

  getOrCreateStock(symbol, exchange) {
    const key = `${symbol}:${exchange}`;

    if (this.createdStocks.has(key)) {
      return this.createdStocks.get(key);
    } else {
      const stock = Stock.create({
        symbol,
        exchange,
        open: Math.random() * 100,
        high: Math.random() * 100,
        low: Math.random() * 100,
        close: Math.random() * 100,
        bid: Math.random() * 100,
        ask: Math.random() * 100,
        tradeDate: new Date(),
      });
      this.createdStocks.set(key, stock);
      return stock;
    }

  },
});
