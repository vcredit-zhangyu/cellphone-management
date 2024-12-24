/*
 * @Author: wanghao10
 * @Date: 2022-11-10 13:59:26
 * @LastEditTime: 2024-05-22 11:00:21
 * @descriptor: 路由拦截校验
 */
import { useEffect } from 'react'
import { Outlet, useLocation,history } from 'umi'
export default () => {
  const pathname = useLocation()?.pathname
  useEffect(() => {
    // 默认重定向到设备管理页
    if(pathname === '/'){
      history.push('/phone/device')
    }
  },[pathname])
  return (
    <Outlet />
  )
}