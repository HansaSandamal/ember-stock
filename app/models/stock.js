import EmberObject from '@ember/object';

export default EmberObject.extend({
  symbol: String(''),
  exchange: String(''),
  open: Number(0),
  high: Number(0),
  low: Number(0),
  close: Number(0),
  bid: Number(0),
  ask: Number(0),
  tradeDate: new Date(),

  createStock: function ({ symbol, exchange, open, high, low, close, bid, ask, tradeDate }) {
    return this.create({
      symbol,
      exchange,
      open,
      high,
      low,
      close,
      bid,
      ask,
      tradeDate: new Date(tradeDate)
    });
  }

});
