import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  update(attribute, event) {
    let value = event.target.value;
    this.model[attribute] = value;
    return this.model[attribute];
  }
}
