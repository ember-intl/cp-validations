import Ember from 'ember';

export default Ember.Route.extend({
  intl: Ember.inject.service(),

  beforeModel() {
    this.intl.setLocale('en-us');
  },

  model() {
    return this.container.lookup('model:dummy');
  },
});
