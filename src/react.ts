import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'

import { defineConfig } from 'eslint/config'

import { baseConfig } from './base'

export const reactConfig = defineConfig([
  baseConfig,

  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],

  reactHooksPlugin.configs.flat.recommended,

  // https://perfectionist.dev/rules
  {
    rules: {
      // 关闭，使用 react/jsx-sort-props 规则
      'perfectionist/sort-jsx-props': 'off'
    }
  },

  // https://github.com/jsx-eslint/eslint-plugin-react
  {
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.node,
        ...globals.serviceworker,
        ...globals.browser
      }
    },
    rules: {
      // 强制 props、state 和 context 使用解构赋值
      'react/destructuring-assignment': ['error', 'always'],
      // 强制 useState 钩子值和 setter 变量的解构和对称命名
      'react/hook-use-state': ['error', { allowDestructuredState: true }],
      // 允许使用未知的 DOM 属性
      'react/no-unknown-property': 'off',
      // React scope no longer necessary with new JSX transform.
      'react/react-in-jsx-scope': 'off',
      // 不允许没有子组件的组件使用额外的结束标签
      'react/self-closing-comp': ['error', { component: true, html: true }],
      // 强制 React 组件使用 function 声明
      // 这里额外允许箭头函数，配合 base 的 no-restricted-syntax：顶层用声明、嵌套用箭头，否则两条规则互相打架
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['function-declaration', 'arrow-function'],
          unnamedComponents: 'function-expression'
        }
      ],
      // 强制 props 按字母顺序
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          ignoreCase: false,
          noSortAlphabetically: false,
          reservedFirst: true,
          shorthandFirst: true,
          shorthandLast: false
        }
      ]
    }
  },

  {
    rules: {
      'react-hooks/incompatible-library': 'off'
    }
  }
])
