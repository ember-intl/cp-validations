export default {
  packageManager: 'pnpm',
  scenarios: [
    {
      files: {
        'tests/dummy/config/ember-intl.js': [
          `module.exports = function () {`,
          `  return {`,
          `    inputPath: 'tests/dummy/translations',`,
          `  };`,
          `};`,
          ``,
        ].join('\n'),
      },
      name: 'ember-intl-8',
      npm: {
        devDependencies: {
          '@ember-intl/v1-compat': '^1.3.1',
          'ember-intl': '^8.4.0',
        },
      },
    },
    {
      name: 'ember-lts-4.12',
      npm: {
        devDependencies: {
          'ember-source': '~4.12.0',
        },
      },
    },
    {
      name: 'ember-lts-5.12',
      npm: {
        devDependencies: {
          'ember-source': '~5.12.0',
        },
      },
    },
    {
      name: 'ember-lts-6.12',
      npm: {
        devDependencies: {
          'ember-source': '~6.12.0',
        },
      },
    },
    {
      name: 'ember-release',
      npm: {
        devDependencies: {
          'ember-source': 'npm:ember-source@latest',
        },
      },
    },
    {
      name: 'ember-beta',
      npm: {
        devDependencies: {
          'ember-source': 'npm:ember-source@beta',
        },
      },
    },
    {
      name: 'ember-canary',
      npm: {
        devDependencies: {
          'ember-source': 'npm:ember-source@alpha',
        },
      },
    },
    {
      env: {
        EMBROIDER_TEST_SETUP_OPTIONS: 'safe',
      },
      name: 'embroider-safe',
      npm: {
        devDependencies: {
          '@embroider/compat': '^3.9.3',
          '@embroider/core': '^3.5.9',
          '@embroider/webpack': '^4.1.2',
          webpack: '^5.112.0',
        },
      },
    },
    // {
    //   env: {
    //     EMBROIDER_TEST_SETUP_OPTIONS: 'optimized',
    //   },
    //   name: 'embroider-optimized',
    //   npm: {
    //     devDependencies: {
    //       '@embroider/compat': '^3.9.3',
    //       '@embroider/core': '^3.5.9',
    //       '@embroider/webpack': '^4.1.2',
    //       webpack: '^5.112.0',
    //     },
    //   },
    // },
  ],
};
