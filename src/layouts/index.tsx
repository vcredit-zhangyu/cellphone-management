/*
 * @Author: waghao10
 * @Date: 2023-02-02 10:15:37
 * @Description: 入口
 */
import { getImg } from '@/common/utils'
import { Outlet } from 'umi'
import styles from './index.module.less'
import { logOut } from '@/services/api/common'
import { useEffect, useState } from 'react'


export default function Layout() {
  const [userInfo, setUserInfo]: any = useState({})
  /**
   * @description: 退出
   * @return {*}
   */
  const out = () => {
    logOut()
    setTimeout(() => {
      history.go(0)
    }, 50)
  }

  useEffect(() => {
    try {
      setUserInfo(JSON.parse(window.localStorage.USERINFO))
    } catch (err) {

    }
  }, [])

  return (
    <div className={styles.layout}>
      <div className={styles.head}>
        <img alt="wxlogo" src={getImg('logo.svg', 0)} />
        <div className={styles.userInfo}>
          <span>{userInfo.userName || ''}</span>
          <span onClick={() => {
            out()
          }}>退出</span>
        </div>
      </div>
      <div className={styles.con}>
        <Outlet />
      </div>
    </div>
  )
}
