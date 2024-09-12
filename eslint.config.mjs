import { fixupConfigRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),

  {
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },

  {
    ignores: ["node_modules/", ".next/"],
  },
];
