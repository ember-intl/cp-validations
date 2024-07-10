[![CI](https://github.com/ember-intl/cp-validations/actions/workflows/ci.yml/badge.svg)](https://github.com/ember-intl/cp-validations/actions/workflows/ci.yml)
[![Ember Observer Score](https://emberobserver.com/badges/-ember-intl-cp-validations.svg)](https://emberobserver.com/addons/@ember-intl/cp-validations)

# @ember-intl/cp-validations

Adds support for [ember-intl](https://github.com/yahoo/ember-intl) in ember-cp-validations

## Requirements

* Ember.js v3.28 or above
* Node.js v18 or above
* `ember-cp-validations` v6
* `ember-intl` v6

## Installation

```sh
ember install @ember-intl/cp-validations
```

## Configuration

Implement the following validation messages across your translations:

```yaml
# <project root>/translations/en.yaml
errors:
  description: "This field"
  inclusion: "{description} is not included in the list"
  exclusion: "{description} is reserved"
  invalid: "{description} is invalid"
  confirmation: "{description} doesn't match {on}"
  accepted: "{description} must be accepted"
  empty: "{description} can't be empty"
  blank: "{description} can't be blank"
  present: "{description} must be blank"
  collection: "{description} must be a collection"
  singular: "{description} can't be a collection"
  tooLong: "{description} is too long (maximum is {max} characters)"
  tooShort: "{description} is too short (minimum is {min} characters)"
  before: "{description} must be before {before}"
  after: "{description} must be after {after}"
  wrongDateFormat: "{description} must be in the format of {format}"
  wrongLength: "{description} is the wrong length (should be {is} characters)"
  notANumber: "{description} must be a number"
  notAnInteger: "{description} must be an integer"
  greaterThan: "{description} must be greater than {gt}"
  greaterThanOrEqualTo: "{description} must be greater than or equal to {gte}"
  equalTo: "{description} must be equal to {is}"
  lessThan: "{description} must be less than {lt}"
  lessThanOrEqualTo: "{description} must be less than or equal to {lte}"
  otherThan: "{description} must be other than {value}"
  odd: "{description} must be odd"
  even: "{description} must be even"
  positive: "{description} must be positive"
  date: "{description} must be a valid date"
  email: "{description} must be a valid email address"
  phone: "{description} must be a valid phone number"
  url: "{description} must be a valid url"
```

### Translating Validator description

To translate the description of a Validator specify the `descriptionKey` to match a key in your translations.

```js
// app/models/user.js

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  username: validator('presence', {
    presence: true,
    descriptionKey: 'key.for.username'
  })
});
```

```yml
# translations/en-us.yml
key:
  for:
    username: 'Username'
```

```yml
# translations/sv-se.yml
key:
  for:
    username: 'Användarnamn'
```

### Customizing the prefix

To change the errors prefix key from `errors` to any other key, such as `validationErrors` you simply add the following to `app/validators/messages.js`.  Now just amend your translation files to be nested under the `validationErrors` object instead of `errors`.

```js
// app/validators/messages.js

import ValidatorsMessages from '@ember-intl/cp-validations/validators/messages';

export default ValidatorsMessages.extend({
  prefix: 'validationErrors'
});
```

### Overriding default translation key

By default, translations will be resolved to `validatorPrefix.validatorType`.  If you need to override this functionality entirely and specify your own message key, you can do so with `messageKey` on the validator object.

```js
// app/models/user.js

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  username: validator('presence', {
    presence: true,
    messageKey: 'username.missing'
  })
});
```

```yml
# translations/en-us.yml
username:
  missing: '{description} is missing'
```

```yml
# translations/sv-se.yml
username:
  missing: '{description} saknas'
```

### Disabling Missing Translation Warnings

To suppress console warnings for missing translations, you can do so by setting `intl_cp_validations.suppressWarnings` in `config/environment`;

```js
// config/environment.js
module.exports = function(environment) {
  const ENV = {};

  if (environment === 'test') {
    ENV.intl_cp_validations = ENV.intl_cp_validations || {};
    ENV.intl_cp_validations.suppressWarnings = true;
  }

  return ENV;
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
