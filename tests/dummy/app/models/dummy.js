/* eslint-disable ember/no-classic-classes */
import EmberObject from '@ember/object';
import { buildValidations, validator } from 'ember-cp-validations';

const Validations = buildValidations({
  username: validator('length', {
    message: 'oops, {description} length is invalid',
    descriptionKey: 'errors.usernameDescription',
    min: 4,
    max: 8,
  }),
  password: [
    validator('presence', true),
    validator('length', {
      message: 'oops, length is invalid',
      min: 4,
      max: 8,
    }),
  ],
  passwordConfirmation: validator('confirmation', {
    on: 'password',
    messageKey: 'errors.passwordConfirmation',
  }),
  email: [validator('presence', true), validator('format', { type: 'email' })],
  emailConfirmation: [
    validator('presence', true),
    validator('confirmation', {
      on: 'email',
      description: 'Email addresses',
    }),
  ],
});

export default EmberObject.extend(Validations, {
  username: '',
  password: '',
  email: '',
});
