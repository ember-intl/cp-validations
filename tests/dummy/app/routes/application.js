import { getOwner } from '@ember/application';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service intl;

  beforeModel() {
    this.intl.setLocale(['en-us']);
  }

  model() {
    return getOwner(this).lookup('model:dummy');
  }
}
