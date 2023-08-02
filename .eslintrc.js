module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:compat/recommended', 'plugin:react-hooks/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  globals: {
    APP_TYPE: true,
    page: true,
  },
  rules: {
    'func-names': 0,
    'compat/compat': 0,
    'linebreak-style': 0,
    'no-nested-ternary': 0,
    'no-restricted-syntax': 0,

    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

    'import/extensions': [0],
    'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
    'import/no-extraneous-dependencies': [
      2,
      {
        optionalDependencies: true,
        devDependencies: true,
      },
    ],

    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-for': [0],
    'jsx-a11y/label-has-associated-control': [0],
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'no-unused-expressions': [2, { allowTernary: true }],
  },
  settings: {
    polyfills: ['fetch', 'promises', 'url'],
  },
};
