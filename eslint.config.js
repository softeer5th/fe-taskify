import js from "eslint-config-ham-javascript";

/**
 * @type {import("eslint").Linter.Config}
 */

export default [
  ...js,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    rules: {
      semi: ["error", "always"],
      "import/extensions": ["error", "always"],
    },
  },
];
