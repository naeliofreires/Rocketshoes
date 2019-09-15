module.exports = {
    env: {
      es6: true,
      node: true,
    },
    extends: [
      'airbnb', 'prettier'
    ],
    plugins: ['prettier'],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      "prettier/prettier": "error",
      "react/jsx-filename-extension": [ 1, { "extensions": [ ".js", ".jsx" ] } ],
      'import/prefer-default-export': 'off',
      'no-param-reassign': 'off',
      'no-console': ['error', {allow: ['tron']}]
    },
  };
