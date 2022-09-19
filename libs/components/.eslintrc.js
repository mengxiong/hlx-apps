const path = require('path');

module.exports = {
  extends: '../../.eslintrc',
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
  },
};
