import baseConfiguration from '@ijlee2-frontend-configs/eslint-config-ember/v1-addon';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  ...baseConfiguration,
  globalIgnores(['dist/', 'dist-for-testing/', 'node_modules/', '.*/']),
]);
