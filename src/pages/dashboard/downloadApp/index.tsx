/*
 * @Author: waghao10
 * @Date: 2024-09-14 13:29:23
 * @Description: 掌御app下载
 */
import useCommonEnum from '@/hooks/getCommonEnums'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import ProductCom from './product'
const Index = () => {
  const { getEnumConfig, allEnumList } = useCommonEnum()
  const [appListConfig, setAppListConfig]: any = useState({})

  /**
   * @description: 初始列表数据
   * @return {*}
   */
  const initData = () => {
    const prodList = [
      {
        id: 1,
        type: 'ios',
        version: '11.2',
        downloadUrl: '',
        environment: 'env',
      },
      {
        id: 3,
        type: 'android',
        version: '14.1',
        downloadUrl:
          '',
        environment: 'env',
      },
    ]
    setAppListConfig({
      // testEvInfo: prodList,
      prodEvInfo: prodList,
    })
    // appDownload({}).then((res: any) => {
    //   if (res) {
    //     console.log(res,'==res==')
    //     const _data = res?.data?.prodEvInfo
    //     setAppListConfig({
    //       testEvInfo: res?.data?.testEvInfo,
    //       prodEvInfo: res?.data?.prodEvInfo
    //     })
    //   }
    // })
  }

  useEffect(() => {
    getEnumConfig()
    initData()
  }, [])

  return (
    <Tabs
      defaultActiveKey="product"
      type="card"
      style={{ marginBottom: 32 }}
      items={[
        {
          label: '生产环境',
          key: 'product',
          children: <ProductCom enumList={allEnumList} initData={appListConfig?.prodEvInfo} />,
        },
        // {
        //   label: '测试环境',
        //   key: 'develop',
        //   children: <DevelopCom enumList={enumList} initData={appListConfig?.testEvInfo} />,
        // },
      ]}
    />
  )
}

export default Index
