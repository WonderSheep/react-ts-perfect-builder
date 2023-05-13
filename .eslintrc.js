const ERROR = 2

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'promise', 'prettier', 'import'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json']
      },
      typescript: {}
    }
  },
  rules: {
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        json: 'never',
        js: 'never'
      }
    ],
    //  用于检测是否引入了不必要的外部依赖，并且允许在开发依赖项中引入这些依赖。先已乘默认
    // 'import/no-extraneous-dependencies': [ERROR, { devDependencies: false }],
    '@typescript-eslint/no-var-requires': 0
  }
}
