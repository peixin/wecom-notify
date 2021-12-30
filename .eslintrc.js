module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: ["standard", "plugin:prettier/recommended"],
  plugins: ["@typescript-eslint"],
  rules: {},
};
