module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    serviceworker: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  globals: {
    "WECOM_CROP_ID": "readonly",
    "WECOM_SECRET": "readonly",
    "TENCENT": "readonly",
    "SECRET_KEY": "readonly",
    "API_KEY_EXPIRES": "readonly",
    "CORS": "readonly",
    "SECRET_KEY_USED_AS_API_KEY": "readonly",
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
