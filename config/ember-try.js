'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    useYarn: true,
    scenarios: [
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            'ember-source': '~3.28.0',
          },
        },
      },
      {
        name: 'ember-4.0',
        npm: {
          devDependencies: {
            'ember-source': '~4.0.0',
          },
        },
      },
      {
        name: 'ember-lts-4.4',
        npm: {
          devDependencies: {
            'ember-source': '~4.4.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            '@ember/string': '3.0.1',
            'ember-source': await getChannelURL('release'),
            'ember-auto-import': '^2',
            webpack: '^5',
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            '@ember/string': '3.0.1',
            'ember-source': await getChannelURL('beta'),
            'ember-auto-import': '^2',
            webpack: '^5',
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            '@ember/string': '3.0.1',
            'ember-source': await getChannelURL('canary'),
            'ember-auto-import': '^2',
            webpack: '^5',
          },
        },
      },
      {
        name: 'ember-classic',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'application-template-wrapper': true,
            'default-async-observers': false,
            'template-only-glimmer-components': false,
          }),
        },
        npm: {
          devDependencies: {
            'ember-source': '~3.28.0',
          },
          ember: {
            edition: 'classic',
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
