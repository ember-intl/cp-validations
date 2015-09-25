import Ember from 'ember';
import ValidatorsMessages from 'ember-cp-validations/validators/messages';

const { Logger:logger } = Ember;

export default {
  name: 'override-get-message-for',

  initialize() {
    ValidatorsMessages.reopen({
      intl: Ember.inject.service(),

      getMessageFor(type, context = {}) {
        let prefix = this.getWithDefault('prefix', 'errors');
        let key = `${prefix}.${type}`;
        let intl = this.get('intl');

        if (!!intl.exists(key)) {
          return intl.formatMessage(intl.findTranslationByKey(key), context);
        }

        logger.warn(`[ember-intl-cp-validations] Missing translation for validation key: ${key}\nhttp://offirgolan.github.io/ember-cp-validations/docs/validators/messages/index.html`);

        return this._super(...arguments);
      }
    });
  }
};
