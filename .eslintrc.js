'use strict';

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: [
        [
          '@babel/plugin-proposal-decorators',
          {
            decoratorsBeforeExport: true,
          },
        ],
      ],
    },
  },
  plugins: ['ember', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    curly: 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.gjs', '.js'],
      },
    },
  },
  overrides: [
    // Ember files
    {
      files: ['**/*.gjs'],
      parser: 'ember-eslint-parser',
      extends: ['plugin:ember/recommended-gjs'],
    },
    {
      files: ['**/*.{gjs,js}'],
      rules: {
        'import/no-duplicates': 'error',
        'import/no-named-as-default-member': 'off',
        'import/no-unresolved': [
          'error',
          { ignore: ['^@ember', '^dummy/', '^ember', 'fetch', 'qunit-dom'] },
        ],
      },
    },
    // Node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './index.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './tests/dummy/config/**/*.js',
      ],
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
    // Test files
    {
      files: ['tests/**/*-test.{gjs,js}'],
      extends: ['plugin:qunit/recommended'],
    },
  ],
};
