module.exports = {
  env: {
    browser: true,
    jest: true,
    node: false,
  },
  globals: {
    module: true,
    beforeAll: true
  },
  extends: [
    "plugin:react/recommended",
  ],
};
