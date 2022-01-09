const globalsVars = require("./globals-vars.js");

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    serviceworker: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  globals: Object.fromEntries(globalsVars.map(varName => [varName, "readonly"])),
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: ["standard", "plugin:prettier/recommended"],
  plugins: ["@typescript-eslint"],
  rules: {},
  ignorePatterns: ["**/*.d.ts"],
};
