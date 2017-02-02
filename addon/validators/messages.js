import Ember from 'ember';
import ValidatorsMessages from 'ember-cp-validations/validators/messages';

const { get, getOwner, isEmpty } = Ember;

export default ValidatorsMessages.extend({
  intl: Ember.inject.service(),
  warn: Ember.warn,
  prefix: 'errors',

  init() {
    this._super(...arguments);

    let owner = getOwner(this);

    if (owner) {
      this._config = owner.resolveRegistration('config:environment') || {};
    }
  },

  _warn(msg, meta) {
    if (this._config && get(this._config, 'intl_cp_validations.suppressWarnings')) {
      return;
    }

    this.warn(msg, meta);
  },

  getDescriptionFor(attribute, options = {}) {
    let intl = get(this, 'intl');
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
        this._warn(`Custom descriptionKey '${key}' provided but does not exist in intl translations.`, false, {
          id: 'ember-intl-cp-validations-missing-custom-key'
        });
      }
    }

    return this._super(...arguments);
  },

  getMessageFor(type, options = {}) {
    let key = get(options, 'messageKey') || `${get(this, 'prefix')}.${type}`;
    let intl = get(this, 'intl');

    if (intl && intl.exists(key)) {
      return this.formatMessage(intl.t(key, options));
    }

    this._warn(`[ember-intl-cp-validations] Missing translation for validation key: ${key}\nhttp://offirgolan.github.io/ember-cp-validations/docs/messages/index.html`, false, {
      id: 'ember-intl-cp-validations-missing-translation'
    });

    return this._super(...arguments);
  }
});
