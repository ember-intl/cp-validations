import Ember from 'ember';
import ValidatorsMessages from 'ember-cp-validations/validators/messages';

const { warn, get, isEmpty } = Ember;

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
          warn(`Custom descriptionKey '${key}' provided but does not exist in intl translations.`, false, {
            id: 'ember-intl-cp-validations-missing-custom-key'
          });
        }
      }

      return this._super(...arguments);
    },

    getMessageFor(type, options = {}) {
      const key = get(options, 'messageKey') || `${this.get('prefix')}.${type}`;
      const intl = get(this, 'intl');

      if (intl && intl.exists(key)) {
        return this.formatMessage(intl.t(key, options));
      }

      warn(`[ember-intl-cp-validations] Missing translation for validation key: ${key}\nhttp://offirgolan.github.io/ember-cp-validations/docs/messages/index.html`, false, {
        id: 'ember-intl-cp-validations-missing-translation'
      });

      return this._super(...arguments);
    }
  });
}
