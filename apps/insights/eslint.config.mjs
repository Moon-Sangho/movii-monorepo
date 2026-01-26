import baseConfig from '@movii/eslint-config';
import pluginTanstackQuery from '@tanstack/eslint-plugin-query';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  ...pluginTanstackQuery.configs['flat/recommended'],
  ...baseConfig,
  globalIgnores([
    'dist/**',
    'node_modules/**',
    '.turbo/**',
  ]),
]);
