import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import storybookPlugin from 'eslint-plugin-storybook';
import globals from 'globals';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      import: importPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-case-declarations': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-multi-spaces': 2,
      'arrow-spacing': [2, { before: true, after: true }],
      'space-in-parens': [2, 'never'],
      'jsx-quotes': [2, 'prefer-double'],
      'react/jsx-indent': [2, 2],
      'react/jsx-indent-props': [2, 2],
      'react/jsx-closing-bracket-location': 2,
      'react/jsx-first-prop-new-line': [2, 'multiline'],
      'react/jsx-wrap-multilines': 2,
      'react/jsx-one-expression-per-line': [2, { allow: 'single-child' }],
      'react/jsx-tag-spacing': [2, { beforeSelfClosing: 'always' }],
      'react/jsx-max-props-per-line': [2, { when: 'multiline' }],
      'react/jsx-no-useless-fragment': 2,
      'react/jsx-props-no-multi-spaces': 2,
      'react/jsx-equals-spacing': 2,
      'react/jsx-curly-spacing': [2, 'never'],
      'react/jsx-curly-brace-presence': [2, { props: 'never', children: 'never' }],
      'import/order': [2, {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      }],
    },
  },
  ...storybookPlugin.configs['flat/recommended'],
  {
    ignores: ['dist/', 'node_modules/', '*.config.*', '*.cjs'],
  },
);
