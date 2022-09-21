'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    // 'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    'ember/new-module-imports': 'off',
    'ember/no-get': 'off',
    'no-undef': 'off',
  },
  overrides: [
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './index.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './tests/dummy/config/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
    },
    {
      // Test files:
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
      rules: {
        'ember/no-restricted-resolver-tests': 'off',
        'ember/no-test-and-then': 'off',
        'ember/no-test-module-for': 'off',
        'ember/prefer-ember-test-helpers': 'off',
        'qunit/no-arrow-tests': 'off',
        'qunit/no-negated-ok': 'off',
      },
    },
  ],
};
