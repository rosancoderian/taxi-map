module.exports = {
	plugins: [require('prettier-plugin-svelte'), require('prettier-plugin-sort-class-names')],
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	pluginSearchDirs: ['.'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
	semi: false
}
