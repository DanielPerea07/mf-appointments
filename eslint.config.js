import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    ignores: [
      'dist',
      '.eslintrc.cjs',
      'tailwind.config.js',
      'vite.config.js',
      'postcss.config.js'
    ],
    plugins: {
      react: reactPlugin,
      reactHooks: reactHooksPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'react/jsx-no-target-blank': 'off',
      semi: ['error', 'always'],
      'no-unused-vars': ['warn'],
      'no-console': 'off',
      'prettier/prettier': [
        'error',
        { trailingComma: 'none', singleQuote: false },
      ],
      'linebreak-style': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['*.js', '*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
];
