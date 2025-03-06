import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';

export default [
  eslintJs.configs.recommended,
  {
    files: ['**/*.ts', '**/*.json'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: '2020',
        sourceType: 'module',
      },
      globals: {
        // Define Node.js globals
        process: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'prettier': prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  prettierConfig,
]; 