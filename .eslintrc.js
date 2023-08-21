const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'react-app',
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jam3',
  ],
  rules: {
    'react/require-default-props': 1,
    'react/forbid-prop-types': [1, { 'forbid': ['array', 'object'] }],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'no-unused-expressions': ['error', { 'allowShortCircuit': true }],
    'react/jsx-props-no-spreading': 0,
    'quote-props': 0,
    'radix': 0,
    'default-case': 0,
    'quotes': [1, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    'jam3/no-sanitizer-with-danger': [
      2,
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
      webpack: {
        config: path.resolve(__dirname, './config/webpack.config.js'),
      },
    },
  },
};