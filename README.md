# ember-intl-cp-validations

[![Greenkeeper badge](https://badges.greenkeeper.io/ember-intl/ember-intl-cp-validations.svg)](https://greenkeeper.io/)

[![npm Version][npm-badge]][npm]
[![Build Status][travis-badge]][travis]
[![Ember Observer Score](http://emberobserver.com/badges/ember-intl-cp-validations.svg)](http://emberobserver.com/addons/ember-intl-cp-validations)
[![Ember badge][ember-badge]][embadge]

Adds support for [ember-intl](https://github.com/yahoo/ember-intl) in ember-cp-validations

Using ember-i18n?  See: [jasonmit/ember-i18n-cp-validations](https://github.com/jasonmit/ember-i18n-cp-validations)

## Requirements

* >= [ember-intl](https://github.com/yahoo/ember-intl) 2.0.0-rc.5
* ember-cp-validations 2.x or 3.x

## Installation

* `ember install ember-intl-cp-validations`

## Configuring

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

### Customizing the prefix

To change the errors prefix key from `errors` to any other key, such as `validationErrors` you simply add the following to `app/validators/messages.js`.  Now just amend your translation files to be nested under the `validationErrors` object instead of `errors`.

```js
// app/validators/messages.js

import ValidatorsMessages from 'ember-intl-cp-validations/validators/messages';

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

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

[npm]: https://www.npmjs.org/package/ember-intl-cp-validations
[npm-badge]: https://img.shields.io/npm/v/ember-intl-cp-validations.svg?style=flat-square
[travis]: https://travis-ci.org/ember-intl/ember-intl-cp-validations
[travis-badge]: https://img.shields.io/travis/ember-intl/ember-intl-cp-validations/master.svg?style=flat-square
[embadge]: http://embadge.io/
[ember-badge]: http://embadge.io/v1/badge.svg?start=1.13.0
