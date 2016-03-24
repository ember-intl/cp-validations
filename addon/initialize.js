import Ember from 'ember';
import ValidatorsMessages from 'ember-cp-validations/validators/messages';

const { Logger:logger, get, isEmpty } = Ember;

export default function() {
  ValidatorsMessages.reopen({
    intl: Ember.inject.service(),
    prefix: 'errors',

    getDescriptionFor(attribute, options = {}) {
      const intl = get(this, 'intl');
      let key = `${get(this, 'prefix')}.description`;
      let foundCustom;

      if (!isEmpty(options.descriptionKey)) {
        key = options.descriptionKey;
        foundCustom = true;
      } else if (!isEmpty(options.description)) {
        return options.description;
      }

      if (intl) {
        if (intl.exists(key)) {
          return intl.t(key, options);
        } else if (foundCustom) {
          logger.warn(`Custom descriptionKey '${key}' provided but does not exist in intl translations.`);
        }
      }

      return this._super(...arguments);
    },

    getMessageFor(type, options = {}) {
      const key = `${get(this, 'prefix')}.${type}`;
      const intl = get(this, 'intl');

      if (intl && intl.exists(key)) {
        return this.formatMessage(intl.t(key, options));
      }

      logger.warn(`[ember-intl-cp-validations] Missing translation for validation key: ${key}\nhttp://offirgolan.github.io/ember-cp-validations/docs/messages/index.html`);

      return this._super(...arguments);
    }
  });
}
