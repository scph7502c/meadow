import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginHbs from 'eslint-plugin-hbs';
import pluginJest from 'eslint-plugin-jest'; // Importujemy obiekt wtyczki Jest

export default [
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,hbs}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      hbs: pluginHbs, // Dodajemy wtyczkę HBS jako obiekt
    },
    ignores: ['**/*.hbs', 'coverage/**'],
    rules: {
      semi: ['error', 'always'],
      'react/jsx-wrap-multilines': 'off',
    },
  },
  {
    files: [
      '**/__tests__/**/*.{js,mjs,cjs,jsx}',
      '**/*.{test,spec}.{js,mjs,cjs,jsx}',
    ], // Testy
    plugins: {
      jest: pluginJest, // Dodajemy wtyczkę Jest
    },
    languageOptions: {
      globals: {
        ...globals.jest, // Włączamy globalne zmienne Jest
      },
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
];
