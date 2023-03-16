import Component from '@ember/component';
import { computed } from '@ember/object';

import DataStore from '../models/datastore';

export default Component.extend({

  init() {
    this._super(...arguments);
    this.set('dataStore', DataStore.create());
    this.dataStore.generateStocks();
  },

  exchangeOptions: ["TDWL", "DFM"],
  selectedExchange: 'TDWL',

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
