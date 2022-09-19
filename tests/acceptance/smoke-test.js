import { visit, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance: Smoke', function (hooks) {
  setupApplicationTest(hooks);

  test('basic translations', async function (assert) {
    assert.expect(3);
    await visit('/');

    assert.dom('.email-validation').hasText(`This field can't be blank`);

    await fillIn('#email', 'you@example.com');
    assert.dom('.email-validation').hasText(``);

    await fillIn('#email', 'invalid-email');
    assert
      .dom('.email-validation')
      .hasText(`This field must be a valid email address`);
  });

  test('inline message', async function (assert) {
    assert.expect(2);
    await visit('/');

    assert.dom('.password-validation').hasText(`This field can't be blank`);

    await fillIn('#password', 'err');
    assert.dom('.password-validation').hasText(`oops, length is invalid`);
  });

  test('translations with custom description', async function (assert) {
    assert.expect(3);
    await visit('/');

    assert.dom('.email-validation').hasText(`This field can't be blank`);
    assert
      .dom('.emailConfirmation-validation')
      .hasText(`This field can't be blank`);

    await fillIn('#email', 'foo@bar.com');
    await fillIn('#emailConfirmation', 'xx@bar.com');
    assert
      .dom('.emailConfirmation-validation')
      .hasText(`Email addresses doesn't match email`);
  });

  test('translations with descriptionKey', async function (assert) {
    await visit('/');

    assert
      .dom('.username-validation')
      .hasText(`oops, Username length is invalid`);
  });

  test('translation with messageKey', async function (assert) {
    await visit('/');

    assert
      .dom('.passwordConfirmation-validation')
      .hasText(`Passwords doesn't match`);
  });
});
