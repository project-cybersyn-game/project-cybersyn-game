module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["standard-with-typescript"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
		project: "./tsconfig.json",
	},
	plugins: ["@typescript-eslint"],
	rules: {
		"brace-style": [2, "1tbs"],
	},
	ignorePatterns: [".eslintrc.js", "**/*.html"],
};