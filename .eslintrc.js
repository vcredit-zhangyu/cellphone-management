/*
 * @Author: waghao10
 * @Date: 2023-04-14 09:28:25
 * @Description:'
 */
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],

  // in antd-design-pro
  // globals: {
  //     ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
  //     page: true,
  // },

  rules: {
    'quotes': [1, 'single'], // 单引号
    'no-console': 0,
    'default-case': 'error',
    'eqeqeq': ['error', 'always'], // 强制三等
    '@typescript-eslint/consistent-type-imports': ['off'],
    'semi':[2,'never']
  },
}