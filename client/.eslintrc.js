module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "import/extensions": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unstable-nested-components": "off",
    "react/no-array-index-key": "off",
    "react/function-component-definition": "off",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": ["error"],
    "no-param-resign": "off",
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "default-param-last": "off",
    "@typescript-eslint/default-param-last": ["off"],
    "react/state-in-constructor": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-unsafe-optional-chaining": "off"
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript"
  ],
}
