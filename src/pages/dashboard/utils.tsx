/*
 * @Author: waghao10
 * @Date: 2022-11-14 12:48:29
 * @Description: 侧边导航配置项
 */

import type { MenuProps } from 'antd'
import { getImg } from '@/common/utils'
import { cloneDeep } from 'lodash'
type MenuItem = Required<MenuProps>['items'][number];

const factory = (type: string, data: any, firstStage: any) => {
  return getItem(
    firstStage?.breadcrumb,
    type,
    firstStage?.icon ? <img style={{ width: '18px', height: '18px' }} src={getImg(firstStage?.icon, 0)} /> : '',
    data.map((s: any) => {
      return getItem(
        s?.breadcrumb,
        s?.key,
        null,
        null,
        s?.type
      )
    }),
  )
}

const renderItem = (data: any) => {
  const routeData = Object.keys(cloneDeep(data)).map(s => {
    return cloneDeep(data)[s]
  })
  const SideItems: MenuItem[] = []
  const newItemData: any = {}
  routeData.map((s: any) => {
    if (s?.levelName) {
      newItemData[s?.levelName] = []
    } else {
      if (s?.type && s?.uniqueCode) {
        if (Object.keys(newItemData).includes(s?.type)) {
          newItemData[s?.type].push(s)
        } else {
          newItemData[s?.type] = [s]
        }
      }
    }
  })
  Object.keys(newItemData).map((keys: string) => {
    const _f = routeData.find((v: any) => v?.levelName === keys)
    SideItems.push(factory(keys, newItemData[keys], _f))
  })
  return SideItems
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: any,
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

/**
 * @description: 枚举值处理
 * @param {any} data
 * @return {*}
 */
const handleEnum = (data: any) => {
  const _obj: any = {}
  data.forEach((v: any) => {
    const _nE = v.enumList.map((s: any) => {
      return {
        label: s.name,
        value: s.code
      }
    })
    _obj[v.enumCode] = _nE
  })
  return _obj
}

/**
 * @description: 映射
 * @param {string} status
 * @return {*}
 */
const getName = (status: string, data: any) => {
  console.log(data,'==d===')
  const _f: any = data.find((v: any) => v.value === status)
  if (_f) {
    return _f.label
  }
}

export { renderItem, handleEnum, getName }
