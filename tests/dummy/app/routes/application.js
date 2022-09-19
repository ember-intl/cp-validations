import Ember from 'ember';
import { getOwner } from '@ember/application';

export default Ember.Route.extend({
  intl: Ember.inject.service(),

  beforeModel() {
    this.get('intl').setLocale('en-us');
  },

  model() {
    return getOwner(this).lookup('model:dummy');
  },
});
