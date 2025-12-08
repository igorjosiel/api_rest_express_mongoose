import js from "@eslint/js";
import globals, { node } from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    env: { node: true },
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: { indent: ["error", 2] }
  },
]);
