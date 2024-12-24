/*
 * @Author: waghao10
 * @Date: 2022-11-18 11:19:15
 * @Description: 路由拦截，通过权限校验添加动态配置
 */

import { GetUserInfo } from './services/api/common'

// 已分配权限的路由
let CONFIGURED_ROUTE: any = []

export function patchClientRoutes({ routes }: any) {
  try {
    assemble(routes[0]?.routes[0]?.routes[0]?.routes || [])
  } catch (err) {
    //
  }
}

/**
 * @description: 动态过滤路由
 * @param {any} routes
 * @return {*}
 */
function assemble(routes: any) {
  for (let i = 0; i < routes.length; i++) {
    if (!CONFIGURED_ROUTE.includes(routes[i].uniqueCode) && !routes[i]?.noVerify) {
      routes.splice(i--, 1)
    } else {
      if (routes[i].routes) {
        assemble(routes[i].routes)
      }
    }
  }
}

/**
 * @description: 渲染前获取路由权限列表
 * @param {any} oldRender
 * @return {*}
 */
export function render(oldRender: any) {
  // @ts-ignore
  GetUserInfo()
    .then((res: any) => {
      const _data = res.data
      if (_data) {
        // 动态路由获取
        CONFIGURED_ROUTE = [
          ..._data?.permissionList, 'PHONE_INDEX'
        ]
        // 缓存用户信息
        window.localStorage.setItem(
          'USERINFO',
          JSON.stringify({
            userName: _data.userName,
            roleList: _data.roleList,
            userAccount: _data.userAccount,
          }),
        )
      }
      oldRender()
    })
    .catch(() => {
      CONFIGURED_ROUTE = ['PHONE_INDEX']
      oldRender()
    })
}
