// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginVue from "eslint-plugin-vue";
// import airbnbTypeScript from "eslint-config-airbnb-typescript";
// import prettierConfig from "eslint-config-prettier";
// import prettierPlugin from "eslint-plugin-prettier";

// export default [
//   { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
//   { languageOptions: { globals: globals.browser } },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   ...pluginVue.configs["flat/essential"],
//   airbnbTypeScript,
//   prettierConfig,
//   prettierPlugin.configs.recommended,
//   {
//     files: ["**/*.vue"],
//     languageOptions: {
//       parserOptions: {
//         parser: tseslint.parser,
//       },
//     },
//   },
// ];


module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // Agrega tus reglas personalizadas aquí
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
