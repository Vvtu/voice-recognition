module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'filename-rules'],
  rules: {
    'filename-rules/match': ['error', /^([a-z,0-9]+-)*[a-z,0-9]+(?:\..*)?$/],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-shadow': ['error', { builtinGlobals: true }],
    'no-shadow-restricted-names': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'newline-before-return': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-router-dom',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-query',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-query/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@mui/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'icons',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'icons/*',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};
