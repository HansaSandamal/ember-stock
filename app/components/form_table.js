import Component from '@ember/component';
import { computed } from '@ember/object';

import DataStore from '../models/datastore';

export default Component.extend({

  init() {
    this._super(...arguments);
    this.set('dataStore', DataStore.create());
    this.dataStore.generateStocks();
  },

  exchangeOptions: computed('dataStore.stocksByExchange', function () {
    return Array.from(this.dataStore.stocksByExchange.keys());
  }),
  
  selectedExchange: computed('exchangeOptions', function () {
    return this.exchangeOptions.firstObject;
  }),

  filteredStocks: computed('dataStore.stocksByExchange', 'selectedExchange', function () {
    return this.dataStore.getStocksByExchange(this.selectedExchange);
  }),

  actions: {
    filterStocks(event) {
      const selectedExchange = (event) || null;

      if (selectedExchange) {
        this.set('selectedExchange', selectedExchange);
      }

    }
  }
});
