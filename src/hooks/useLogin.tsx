/*
 * @Author: waghao10
 * @Date: 2023-05-12 09:34:30
 * @Description: 登录控制
 */

import { userDetailIterface } from '@/typings'
import { useEffect, useState } from 'react'
import { useDispatch } from 'umi'

function useLogin() {
  const [userDetail, setUserDetail] = useState({} as userDetailIterface)
  const dispatch = useDispatch()

  /**
     * @description: 退出登录
     * @return {*}
     */
  const logOut = () => {
    //
  }

  useEffect(() => {
    // 获取用户信息
    new Promise((resolve) => {
      dispatch({
        type: 'user/getData',
        payload: {
          resolve
        },
      })
    }).then((res: any) => {
      setUserDetail(res)
    })
  }, [])

  return {
    userDetail,
    setUserDetail,
    logOut,
  }
}

export default useLogin