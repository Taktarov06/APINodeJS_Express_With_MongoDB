import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        es2021: true,
        node: true,
        process: true,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    rules: {
      indent: ["error", 2],
      "linebreak-style": ["error", "windows"],
      quotes: ["error", "double"],
      semi: ["error", "always"]
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    rules: pluginJs.configs.recommended.rules
  }
];
