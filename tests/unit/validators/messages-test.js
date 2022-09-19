import { moduleFor, test } from 'ember-qunit';

moduleFor('@ember-intl/cp-validations@validator:messages', 'Unit | Validators | messages', {
  unit: true,
  needs: [
    'service:intl',
    'config:environment',
    'translation:en-us',
    'cldr:en',
    'ember-intl@adapter:default'
  ]
});

test('it exists', function(assert) {
  assert.expect(1);
  assert.ok(this.subject());
});

test('suppressWarnings set to true', function(assert) {
  assert.expect(1);

  this.register('config:environment', {
    intl_cp_validations: {
      suppressWarnings: true
    }
  });

  this.inject.service('intl');
  this.intl.setLocale('en-us');
  let triggered = false;

  const instance = this.subject({
    warn() {
      triggered = true;
    }
  });

  instance.getMessageFor('foobarbaz');
  assert.ok(!triggered);
});

test('suppressWarnings unset', function(assert) {
  assert.expect(1);

  this.inject.service('intl');
  this.intl.setLocale('en-us');

  const instance = this.subject({
    warn() {
      assert.ok(true);
    }
  });

  instance.getMessageFor('foobarbaz');
});
