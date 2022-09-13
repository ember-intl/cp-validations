import { getWarnings } from '@ember/test-helpers';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

  const specifier = '@ember-intl/cp-validations@validator:messages';

module('Unit | validators | messages', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    assert.ok(this.owner.lookup(specifier));
  });

  test('suppressWarnings set to true', function (assert) {
    this.owner.register('config:environment', {
      intl_cp_validations: {
        suppressWarnings: true,
      },
    });

    this.owner.lookup('service:intl').setLocale('en-us');

    const instance = this.owner.lookup(specifier);
    instance.getMessageFor('foobarbaz');

    assert.deepEqual(getWarnings(), []);
  });

  test('suppressWarnings unset', function (assert) {
    this.owner.lookup('service:intl').setLocale('en-us');

    const instance = this.owner.lookup(specifier);
    instance.getMessageFor('foobarbaz');

    assert.deepEqual(getWarnings(), [
      {
        message:
          '[ember-intl-cp-validations] Missing translation for validation key: errors.foobarbaz\nhttp://offirgolan.github.io/ember-cp-validations/docs/messages/index.html',
        options: {
          id: 'ember-intl-cp-validations-missing-translation',
        },
      },
    ]);
  });
});
