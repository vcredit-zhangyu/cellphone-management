### 项目简介
本项目是基于umi + antd + typeScript + dva等技术栈构建的后台管理系统，主要用来管理测试手机，减少手机兼容性问题。

### 环境准备
+ 开发工具：vscode
+ 运行环境: node版本v16.19.0及以上

### 项目运行
```
# 安装依赖
npm i
# 启动项目
npm run start
```

### 项目本地调试
```
# .umirc.ts文件调整后端接口代理地址
 proxy: {
    '/vzy': {
      target:'localhost:33956', // 对应的后端接口地址
      changeOrigin: true,
      secure: false,
      proxyTimeout: 1000 * 60 * 60 * 1,
      timeout: 1000 * 60 * 60 * 1,
    },
  },

# ./services/http.tsx文件设置token（测试环境）
if (/localhost/gi.test(window.location.href)) {
    token = '' //改为测试环境对应token地址即可
  } else {
  token = getCookie('Vzy-Website-Token')
}

```

### 项目打包
```
npm run build:test // 测试环境打包

npm run build:prod // 生产环境打包

```

### 项目整体目录结构

```
cellphone-management
├─ .commitlintrc.js  // commitlint配置
├─ .eslintignore
├─ .eslintrc.js // eslint配置
├─ .husky
│  └─ commit-msg
├─ .npmrc
├─ .prettierignore
├─ .prettierrc.js
├─ .stylelintrc.js
├─ .umirc.ts // umi配置
├─ config
│  └─ routes.tsx // 路由配置
├─ global.d.ts
├─ package.json
├─ public // 静态资源
│  └─ static
├─ README.md
├─ src
│  ├─ app.tsx
│  ├─ assets
│  │  └─ images
│  ├─ common
│  │  └─ utils.tsx
│  ├─ global.d.ts
│  ├─ global.less
│  ├─ hooks // 自定义hooks
│  │  ├─ getCommonEnums.tsx
│  │  ├─ static.ts
│  │  ├─ useCreateMenu.tsx
│  │  ├─ useLogin.tsx
│  │  └─ utils.tsx
│  ├─ layouts // 布局
│  │  ├─ index.module.less
│  │  └─ index.tsx
│  ├─ models  // dva配置
│  │  └─ userInfo.tsx
│  ├─ pages
│  │  ├─ 404  // 404页面
│  │  │  └─ index.tsx
│  │  ├─ components   // 公共组件
│  │  │  └─ breadCrumb.tsx
│  │  ├─ dashboard 
│  │  │  ├─ apply   // 申请记录
│  │  │  ├─ device  // 设备申请
│  │  │  ├─ deviceUsersNum // 用户统计
│  │  │  ├─ downloadApp  // 掌御app下载
│  │  │  ├─ feedBack // 意见反馈
│  │  │  ├─ update // 设备变更记录
│  │  │  ├─ use // 设备使用记录
│  │  │  └─ version // app版本管理
│  │  ├─ home // 默认页面
│  │  └─ nopermission // 无权限页面
│  ├─ services // 请求服务
│  │  ├─ api
│  │  │  ├─ common.ts
│  │  │  └─ upload.ts
│  │  ├─ http.tsx
│  │  └─ typings
│  │     └─ index.ts
│  ├─ typings
│  │  ├─ index.ts
│  │  └─ ZH.ts
│  └─ wrappers
│     └─ auth.tsx
├─ tsconfig.json // ts配置
└─ typings.d.ts

```
