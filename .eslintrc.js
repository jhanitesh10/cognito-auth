module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  env: {
    node: true
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__'],
      },
    ],
  },
};
