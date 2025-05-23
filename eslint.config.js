import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      "react/jsx-props-no-spreading": "off",
      "react/strict-boolean-expressions": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "no-trailing-spaces": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/method-signature-style": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "no-constant-condition": "off",
      "multiline-ternary": "off"
    },
  },
)
