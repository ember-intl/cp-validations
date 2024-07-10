import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @action update(attribute, event) {
    const value = event.target.value;

    this.model[attribute] = value;

    return this.model[attribute];
  }
}
