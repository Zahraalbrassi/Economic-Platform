import nextPlugin from "@next/eslint-plugin-next";

// Flat config for Next.js core-web-vitals rules without FlatCompat
export default [
  nextPlugin.configs["core-web-vitals"],
];
