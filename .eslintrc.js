module.exports = {
  plugins: ['prettier'],
  extends: ['react-app', require.resolve('eslint-config-prettier')],
  overrides: [
    {
      files: ['src/**/*'],
      rules: {
        'no-var': ['error'],
        radix: ['error'],
        'prettier/prettier': 'warn',
        'react/jsx-max-props-per-line': 'off'
      }
    }
  ]
}
