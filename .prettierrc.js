module.exports = {
  bracketSameLine: false,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'auto',
  semi: false,
  arrowParens: 'avoid',
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['decorators-legacy', 'jsx', 'typescript'],
}
