import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  update(attribute, event) {
    let value = event.target.value;
    return this.model.set(attribute, value);
  }
}
