module.exports = {
  plugins: ['prettier'],
  extends: 'react-app',
  overrides: [
    {
      files: ['src/**/*'],
      rules: {
        'no-var': ['error'],
        radix: ['error'],
        'prettier/prettier': 'warn',
        'react/jsx-max-props-per-line': [2, { maximum: 5, when: 'always' }]
      }
    }
  ]
}
