import nextVitals from 'eslint-config-next/core-web-vitals'

import { defineConfig, globalIgnores } from 'eslint/config'

import { reactConfig } from './react'

export const nextJsConfig = defineConfig([
  globalIgnores(['.next/**', 'next-env.d.ts']),

  reactConfig,
  nextVitals,

  // https://eslint.org.cn/docs/latest/rules
  {
    rules: {
      // 当通过 import 加载时，禁用指定的模块
      'no-restricted-imports': [
        'error',
        {
          paths: ['next/router']
        }
      ]
    }
  },

  {
    rules: {
      '@typescript-eslint/require-await': 'off'
    }
  }
])
