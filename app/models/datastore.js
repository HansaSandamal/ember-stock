import EmberObject from '@ember/object';
import Stock from './stock';

const EXCHANGE_SYMBOLS = [
  { exchange: 'TDWL', symbols: [1010, 1020, 1090, 2040, 1040] },
  { exchange: 'DFM', symbols: ['EMAAR', 'DFM', 'DIB', 'SHUAA', 'UPP'] },
];

export default EmberObject.extend({
  stocks: [],
  stocksByExchange: new Map(),
  createdStocks: new Map(),

  generateStocks() {

    EXCHANGE_SYMBOLS.forEach(({ exchange, symbols }) => {
      symbols.forEach((symbol) => {
        this._getOrCreateStock(symbol, exchange); 
      });
    });

    this._startUpdates();
  },

  getStocksByExchange(exchange) {
    return this.stocksByExchange.get(exchange) || [];
  },

  _getOrCreateStock(symbol, exchange) {
    const key = `${symbol}:${exchange}`;

    if (this.createdStocks.has(key)) {
      return this.createdStocks.get(key);
    } else {
      const stock = Stock.create({
        symbol,
        exchange,
      });

      this.createdStocks.set(key, stock);
      this.stocks.push(stock); 
      
      const exchangeStocks = this.stocksByExchange.get(exchange) || [];
      exchangeStocks.push(stock);
      this.stocksByExchange.set(exchange, exchangeStocks);

      return stock;
    }
  },

  _startUpdates() {
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

      setTimeout(update, 1000);
    };

    setTimeout(update, 1000);
  },
});
