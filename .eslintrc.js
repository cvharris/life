module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: ['react-app', 'plugin:prettier/recommended'],
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
