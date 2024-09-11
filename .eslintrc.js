module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:import/typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: [
    "prettier",
    "react",
    "@typescript-eslint",
    "unused-imports",
    "react-hooks",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        trailingComma: "all",
        printWidth: 80,
        useTabs: false,
        endOfLine: "auto",
        singleAttributePerLine: true,
        arrowParens: "avoid",
      },
    ],
    "no-nested-ternary": "off",
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": ["off"],
    "react/jsx-props-no-spreading": ["warn"],
    "react/no-unescaped-entities": ["off"],
    "react/jsx-filename-extension": "off",
    "import/prefer-default-export": "off",
    "no-unused-vars": [
      "error",
      {
        args: "after-used",
        caughtErrors: "all",
        ignoreRestSiblings: true,
        vars: "all",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "after-used",
        caughtErrors: "all",
        ignoreRestSiblings: true,
        vars: "all",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "react/jsx-no-useless-fragment": "off",
    "react/jsx-fragments": ["off"],
    "array-bracket-newline": ["error", "consistent"],
    "array-callback-return": "error",
    "array-element-newline": ["error", "consistent"],
    "arrow-body-style": [
      "error",
      "as-needed",
      {
        requireReturnForObjectLiteral: false,
      },
    ],
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": [
      "error",
      {
        after: true,
        before: true,
      },
    ],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "react/require-default-props": "off",
    "react/jsx-no-bind": [
      "error",
      {
        allowArrowFunctions: true,
        allowBind: false,
        allowFunctions: false,
        ignoreDOMComponents: false,
        ignoreRefs: false,
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
  },
};
