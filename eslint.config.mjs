import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "no-console": "warn",
      "no-unused-vars": "error", 
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "semi": ["error", "always"], 
      "quotes": ["error", "double"], 
      "no-serialize-functions": "off", 
    },
  },
];

export default eslintConfig;
