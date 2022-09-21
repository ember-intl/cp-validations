import { getWarnings } from '@ember/test-helpers';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Validators | messages', function (hooks) {
  setupTest(hooks);

  const specifier = '@ember-intl/cp-validations@validator:messages';

  test('it exists', function (assert) {
    assert.expect(1);
    assert.ok(this.owner.lookup(specifier));
  });

  test('suppressWarnings set to true', function (assert) {
    assert.expect(1);

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
    assert.expect(1);

    this.owner.lookup('service:intl').setLocale('en-us');

    const instance = this.owner.lookup(specifier);
    instance.getMessageFor('foobarbaz');

    assert.deepEqual(getWarnings(), [
      {
        message:
          '[@ember-intl/cp-validations] Missing translation for validation key: errors.foobarbaz\nhttps://adopted-ember-addons.github.io/ember-cp-validations/docs/messages/index.html',
        options: {
          id: 'ember-intl-cp-validations-missing-translation',
        },
      },
    ]);
  });
});
