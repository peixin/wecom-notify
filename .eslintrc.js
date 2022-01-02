module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    serviceworker: true,
  },
  parser: "@typescript-eslint/parser",
  globals: {
    "WECOM_CROP_ID": "readonly",
    "WECOM_SECRET": "readonly",
    "TENCENT": "readonly"
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: ["standard", "plugin:prettier/recommended"],
  plugins: ["@typescript-eslint"],
  rules: {},
  ignorePatterns: ["**/*.d.ts"],
};
