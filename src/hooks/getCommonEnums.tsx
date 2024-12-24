/*
 * @Author: waghao10
 * @Date: 2023-05-12 09:34:30
 * @Description: 全局通用枚举获取
 */

import { handleEnum } from '@/pages/dashboard/utils'
import { getEnums } from '@/services/api/common'
import { useRef, useState } from 'react'

type enumTypeInteface = Record<string, any>;

function useCommonEnum() {
  const enumList = useRef({} as enumTypeInteface)
  const [allEnumList,setAllEnumList] = useState({})
  /**
   * @description: 获取全局枚举
   * @return {*}
   */
  const getEnumConfig = async () => {
    const _res: any = await getEnums()
    let _hd
    if (_res) {
      _hd = handleEnum(_res.data)
      console.log(_hd,'-')
      setAllEnumList(_hd)
      enumList.current = _hd
    }
  }

  return {
    getEnumConfig,
    enumList,
    allEnumList
  }
}

export default useCommonEnum