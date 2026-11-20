import js from '@eslint/js'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import unusedImports from 'eslint-plugin-unused-imports'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint, { FlatConfig } from 'typescript-eslint'

/**
 * 只有这些文件走 TypeScript 解析器和类型感知规则，避免 .js/.mjs 因不在 tsconfig 中报解析错误
 */
export const tsFiles = ['**/*.{ts,tsx,mts,cts}']

/**
 * 统一对象属性排序规则
 */
const sortObjectRulesEntry: FlatConfig.RuleEntry = [
  'error',
  {
    groups: ['unknown', 'multiline-property', ['method', 'onEvent'], 'multiline-method'],
    order: 'asc',
    partitionByNewLine: true,
    type: 'natural',
    customGroups: [
      {
        elementNamePattern: '^on[A-Z]',
        groupName: 'onEvent',
        selector: 'property'
      }
    ]
  }
]

export const baseConfig = defineConfig([
  // ESLint 自身配置文件通常不在 tsconfig 的 include 里，跳过它可以避免类型感知解析报错
  globalIgnores(['**/eslint.config.{js,mjs,cjs,ts,mts,cts}']),

  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked.map(config => ({ ...config, files: tsFiles })),
  ...tseslint.configs.stylisticTypeChecked.map(config => ({ ...config, files: tsFiles })),

  eslintPluginPrettierRecommended,

  perfectionist.configs['recommended-natural'],

  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },

  {
    files: tsFiles,
    languageOptions: {
      parserOptions: {
        projectService: true
      }
    }
  },

  // https://eslint.org/docs/latest/rules/
  {
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
      'no-restricted-syntax': [
        'error',
        {
          message: '顶层含块体的函数请使用 function 声明，不要用箭头函数赋值',
          selector:
            ':matches(ExportNamedDeclaration, Program) > VariableDeclaration > VariableDeclarator:not([id.typeAnnotation]) > ArrowFunctionExpression > BlockStatement'
        },
        {
          message: '嵌套函数请使用箭头函数赋值，不要用 function 声明',
          selector: 'BlockStatement > FunctionDeclaration'
        }
      ]
    }
  },

  // https://typescript-eslint.io/rules
  {
    files: tsFiles,
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/return-await': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'none',
          argsIgnorePattern: '^_',
          caughtErrors: 'none',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },

  // https://github.com/prettier/eslint-plugin-prettier#options
  {
    rules: {
      'prettier/prettier': 'error'
    }
  },

  // https://github.com/sweepline/eslint-plugin-unused-imports?tab=readme-ov-file#usage
  {
    plugins: {
      'unused-imports': unusedImports
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'off'
    }
  },

  // https://perfectionist.dev/rules
  {
    rules: {
      'perfectionist/sort-interfaces': sortObjectRulesEntry,
      'perfectionist/sort-object-types': sortObjectRulesEntry,
      'perfectionist/sort-objects': sortObjectRulesEntry,
      'perfectionist/sort-exports': [
        'error',
        {
          groups: ['type-export', { newlinesBetween: 1 }],
          order: 'asc',
          partitionByComment: true,
          type: 'natural'
        }
      ],
      'perfectionist/sort-imports': [
        'error',
        {
          order: 'asc',
          type: 'natural',
          groups: [
            'side-effect-style',
            'style',
            'type',
            ['default-builtin', 'default-external'],
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
            'side-effect',
            'unknown'
          ]
        }
      ]
    }
  }
])
