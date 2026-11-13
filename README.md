# @xhp443/eslint-config

共享的 ESLint flat config，适用于 TypeScript 项目，基于 ESLint 9 + `typescript-eslint`，并内置常用的 React / Next.js 规则与格式化约束。

## 适用场景

- 纯 TypeScript / Node 项目
- React 组件项目
- Next.js 项目
- 需要统一代码风格、类型检查和 import / object 排序规则的团队项目

## 内置能力

本配置已包含以下约束：

- `@eslint/js` 推荐规则
- `typescript-eslint` 的类型感知规则（仅作用在 TypeScript 文件）
- `eslint-plugin-prettier`：Prettier 集成
- `unused-imports`：自动报错未使用导入
- `perfectionist`：统一对象、接口、导出等排序规则
- React / React Hooks 推荐规则
- Next.js 的核心 Web Vitals 规则

## 先决条件

- `eslint` `^9`
- `typescript` `^6`

说明：本包会把运行时代码依赖一并分发，不需要在业务项目中重复安装 `prettier`、`eslint-plugin-*` 等插件。

> 本包直接发布 TypeScript 源码，必须通过 `eslint.config.ts` 使用，不能直接写成 CommonJS/旧版 `.eslintrc` 方式。

## 安装

```bash
pnpm add -D eslint@^9 typescript@^6 @xhp443/eslint-config
```

如果你用的是 npm 或 yarn，也可以对应替换安装命令。

## 基础配置

```ts
// eslint.config.ts
import { baseConfig } from '@xhp443/eslint-config'

export default baseConfig
```

### React 项目

```ts
// eslint.config.ts
import { reactConfig } from '@xhp443/eslint-config'

export default reactConfig
```

### Next.js 项目

```ts
// eslint.config.ts
import { nextJsConfig } from '@xhp443/eslint-config'

export default nextJsConfig
```

如果使用 Next.js，请确保项目中已经安装了 `next`。
