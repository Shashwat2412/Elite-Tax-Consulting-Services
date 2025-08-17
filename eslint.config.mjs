import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // This block turns off specific rules or all rules
  {
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    rules: {
      // Disable the ones you mentioned
      "no-unused-vars": "off",
      "no-redeclare": "off",
      "no-param-reassign": "off",

      // Disable all other common ones if needed
      "no-console": "off",
      "no-undef": "off",
      // Add more here if you want to d
// To disable **everything**, you could write a script to auto-generate all rules as "off",
      // or simply remove the `extends` entirely and use an empty config.
    },
  },
];

export default eslintConfig;

