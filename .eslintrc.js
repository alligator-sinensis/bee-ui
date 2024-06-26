module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    uni: true,
    getCurrentPages: true,
    plus: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "plugin:prettier/recommended",
    ".eslintrc-auto-import.json",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "vue"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "vue/multi-word-component-names": "off",
    "vue/attribute-hyphenation": "error",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          normal: "never",
          void: "any",
          component: "always",
        },
        svg: "always",
      },
    ],
    "vue/attributes-order": [
      "warn",
      {
        order: [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          "UNIQUE",
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          "OTHER_ATTR",
          "EVENTS",
          "CONTENT",
        ],
        alphabetical: true,
      },
    ],
    "no-duplicate-imports": "error",
    "prefer-const": "error",
    "@typescript-eslint/ban-ts-comment": "off",
  },
}
