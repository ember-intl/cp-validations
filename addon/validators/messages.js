import { getOwner } from '@ember/application';
import { warn } from '@ember/debug';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import ValidatorsMessages from 'ember-cp-validations/validators/messages';

export default ValidatorsMessages.extend({
  intl: service(),

  prefix: 'errors',

  init() {
    this._super(...arguments);

    const owner = getOwner(this);

    if (owner) {
      this._config = owner.resolveRegistration('config:environment') ?? {};
    }
  },

  _warn(msg, test, meta) {
    const { suppressWarnings } = this._config?.intl_cp_validations ?? {};

    if (suppressWarnings) {
      return;
    }

    warn(msg, test, meta);
  },

  getDescriptionFor(attribute, options = {}) {
    const { intl, prefix } = this;

    let key = `${prefix}.description`;
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
        this._warn(
          `Custom descriptionKey '${key}' provided but does not exist in intl translations.`,
          false,
          {
            id: 'ember-intl-cp-validations-missing-custom-key',
          }
        );
      }
    }

    return this._super(...arguments);
  },

  getMessageFor(type, options = {}) {
    const { intl, prefix } = this;

    const key = options.messageKey ?? `${prefix}.${type}`;

    if (intl && intl.exists(key)) {
      return this.formatMessage(intl.t(key, options));
    }

    this._warn(
      `[ember-intl-cp-validations] Missing translation for validation key: ${key}\nhttp://offirgolan.github.io/ember-cp-validations/docs/messages/index.html`,
      false,
      {
        id: 'ember-intl-cp-validations-missing-translation',
      }
    );

    return this._super(...arguments);
  },
});
