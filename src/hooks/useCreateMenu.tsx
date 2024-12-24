/*
 * @Author: waghao10
 * @Date: 2023-05-11 17:58:23
 * @Description: 侧边导航操作
 */

import { useEffect, useState } from 'react'
import { renderItem } from './utils'
import { flatRoutes } from '@/common/utils'
import { useAppData, useLocation, history, useRouteProps } from 'umi'
import { DIRECT_NAME } from './static'

/**
 * @description: 侧边导航创建和控制
 * @return {*}
 */
function useCreateMenu() {
  const { clientRoutes } = useAppData()
  const [openKeys, setOpenKeys] = useState(['phone'])
  const [defaultIndex, setDefaultIndex] = useState(false)
  const [breadStatus, setBreadStatus] = useState(false)
  const rootSubmenuKeys = ['phone']
  const [activeKey, setActiveKey] = useState('device')
  const { pathname } = useLocation()
  const [itemList, setItemList] = useState([])
  const getList: any = renderItem(flatRoutes(clientRoutes, []))
  const currentRoute = useRouteProps()

  /**
   * @description: 导航切换
   * @param {any} data
   * @return {*}
   */
  function handleClick(data: any) {
    const path = `/${data?.keyPath.reverse().join('/')}`
    history.push(path)
  }

  /**
   * @description: 折叠控制
   * @param {any} keys
   * @return {*}
   */
  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  useEffect(() => {
    if (DIRECT_NAME.includes(pathname)) {
      setDefaultIndex(true)
      history.push('/')
    } else {
      setDefaultIndex(false)
    }
    const base = pathname.split('/')
    if (currentRoute.path === '*') {
      setBreadStatus(false)
    } else {
      setBreadStatus(true)
    }
    // setOpenKeys([currentRoute.type])
    setActiveKey(base[base.length - 1])
  }, [pathname])

  /**
   * @description: 可操作路由列表
   * @return {*}
   */
  useEffect(() => {
    setItemList(getList)
  }, [])

  return {
    itemList,
    setItemList,
    onOpenChange,
    handleClick,
    activeKey,
    setActiveKey,
    defaultIndex,
    setDefaultIndex,
    openKeys,
    setOpenKeys,
    breadStatus
  }
}

export default useCreateMenu