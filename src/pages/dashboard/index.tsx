/*
 * @Author: waghao10
 * @Date: 2023-02-09 13:58:14
 * @Description: 决策管理页
 */
import { Menu, ConfigProvider, Button } from 'antd'
import { Outlet, connect, useSearchParams, useSelectedRoutes } from 'umi'
import styles from './index.module.less'
import HomeCom from '@/pages/home'
import zhCN from '@/typings/ZH'
import useCreateMenu from '@/hooks/useCreateMenu'
import BreadCom from '@/pages/components/breadCrumb'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { useState } from 'react'

const DashBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageType = searchParams.get('type')
  const [collapsed, setCollapsed] = useState(false)
  // 侧边导航处理
  const { itemList, handleClick, onOpenChange, activeKey, openKeys, defaultIndex, breadStatus } = useCreateMenu()
  const route: any = useSelectedRoutes().filter((v: any) => v.pathname !== '/')
  const renderBreadCrumb = () => {
    return <BreadCom routes={route} pageType={pageType} />
  }
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.decision}>
        <div className={styles.menu}>
          <Menu
            className={styles.decisionNav}
            mode="inline"
            selectedKeys={[activeKey]}
            onClick={handleClick}
            onOpenChange={onOpenChange}
            // theme="dark"
            inlineCollapsed={collapsed}
            items={itemList}
            openKeys={openKeys}
            defaultOpenKeys={['phone']}
          />
          {/* <Button onClick={toggleCollapsed} className={styles.collapseBtn}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button> */}
        </div>
        <div className={styles.decisionCon}>
          {
            breadStatus && <div className={styles.breadCrumb}>
              {
                renderBreadCrumb()
              }
            </div>
          }
          <div className={styles.main}>
            {
              defaultIndex ? <HomeCom /> : <Outlet />
            }
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default connect((data: any) => data)(DashBoard)