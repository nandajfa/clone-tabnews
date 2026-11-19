import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  js.configs.recommended,
  jest.configs["flat/recommended"],
  ...nextVitals,
  prettier,
]);
