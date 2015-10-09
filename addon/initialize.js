import Ember from 'ember';
import ValidatorsMessages from 'ember-cp-validations/validators/messages';

const { Logger:logger } = Ember;

export default function() {
  ValidatorsMessages.reopen({
    intl: Ember.inject.service(),
    prefix: 'errors',

    getDescriptionFor(attribute, context = {}) {
      let key = `${this.get('prefix')}.description`;
      let intl = this.get('intl');

      if (intl && intl.exists(key)) {
        return intl.formatMessage(intl.findTranslationByKey(key), context);
      }

      return this._super(...arguments);
    },

    getMessageFor(type, context = {}) {
      let key = `${this.get('prefix')}.${type}`;
      let intl = this.get('intl');

      if (intl && intl.exists(key)) {
        return this.formatMessage(intl.formatMessage(intl.findTranslationByKey(key), context));
      }

      logger.warn(`[ember-intl-cp-validations] Missing translation for validation key: ${key}\nhttp://offirgolan.github.io/ember-cp-validations/docs/messages/index.html`);

      return this._super(...arguments);
    }
  });
}
