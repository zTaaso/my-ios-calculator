module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    'react-hooks/exhaustive-deps': 1,
    'react-hooks/rules-of-hooks': 'error',
    '@typescript-eslint/explicit-function-return-type': 1,
  },
}
