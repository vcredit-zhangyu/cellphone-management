/*
 * @Author: waghao10
 * @Date: 2024-09-14 15:04:01
 * @Description: 测试手机机型分布
 */
import useCommonEnum from '@/hooks/getCommonEnums'
import { deviceReport } from '@/services/api/common'
import { Card, Pagination, Table, TableColumnsType } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import BrandCom from './brand'
import styles from './index.module.less'
import VersionCom from './version'
interface DataType {
  key: React.Key
  name: string
  brand: string
  model: string
  deviceid: string
  age: number
}
const Distribute = () => {
  const [reportData, setReportData] = useState({
    brandDis: [],
    versionDis: {} as any,
    modelDis: [],
  })
  const [form] = useForm()
  const { getEnumConfig, enumList } = useCommonEnum()
  const [viewType, setViewType] = useState('品牌')

  /**
   * @description: 表头
   * @return {*}
   */
  const columns = [
    {
      title: '品牌',
      dataIndex: 'brand',
    },
    {
      title: '型号',
      dataIndex: 'model',
    },
    {
      title: '用户量（个）',
      dataIndex: 'nums',
    },
  ]

  const BrandColumns: TableColumnsType<DataType> = [
    {
      title: '产品',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },

    {
      title: '品牌',
      dataIndex: 'brand',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.brand.indexOf(value as string) === 0,
    },
    {
      title: '设备',
      dataIndex: 'model',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.model.indexOf(value as string) === 0,
    },
    {
      title: '设备型号',
      dataIndex: 'deviceid',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.deviceid.indexOf(value as string) === 0,
    },

    {
      title: '数量',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
  ]
  const data = [
    {
      key: '1',
      name: '卡卡',
      brand: '华为',
      model: '华为12',
      deviceid: '红米啦啦啦',
      age: 77,
    },
    {
      key: '2',
      name: '卡卡',
      brand: '华为',
      model: '华为12',
      deviceid: '红米啦啦啦',
      age: 77,
    },
    {
      key: '3',
      name: '豆豆',
      brand: '华为',
      model: '华为12',
      deviceid: '红米啦啦啦',
      age: 77,
    },
    {
      key: '4',
      name: '豆豆',
      brand: '苹果',
      model: '苹果12',
      deviceid: '23848949',
      age: 77,
    },
  ]
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 100,
  })
  const handleTableChange = (newPagination) => {
    setPagination(newPagination)
  }

  const CustomPagination = ({ onChange, current, pageSize, total }) => {
    const handlePageSizeChange = (value) => {
      onChange(current, value)
    }

    return (
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger
        onShowSizeChange={handlePageSizeChange}
      />
    )
  }

  /**
   * @description: 初始化统计数据
   * @return {*}
   */
  const initData = () => {
    deviceReport({}).then((res: any) => {
      if (res && res?.code === 0) {
        const _res = res
        setReportData({
          brandDis: _res?.data?.brandDis,
          versionDis: _res?.data?.versionDis,
          modelDis: _res?.data?.modelDis,
        })
      }
    })
  }

  useEffect(() => {
    // 枚举
    getEnumConfig()
    initData()
  }, [])
  return (
    <div className={styles.dashboard}>
      {/* 品牌分布 */}
      {
        <Card title="品牌分布" hoverable={true}>
          <BrandCom dataSource={reportData.brandDis} />
        </Card>
      }
      {/* 版本分布 */}
      {
        <Card title="系统版本分布" hoverable={true}>
          <div className={styles.pieGroup}>
            {reportData?.versionDis?.iosModelList &&
              reportData?.versionDis?.iosModelList.length > 0 && (
                <VersionCom
                  id="ios"
                  title="IOS版本"
                  dataSource={reportData.versionDis?.iosModelList}
                />
              )}
            {reportData?.versionDis?.hmModelList &&
              reportData?.versionDis?.hmModelList.length > 0 && (
                <VersionCom
                  id="harmony"
                  title="鸿蒙版本"
                  dataSource={reportData.versionDis?.hmModelList}
                />
              )}
            {reportData?.versionDis?.androidModelList &&
              reportData?.versionDis?.androidModelList.length > 0 && (
                <VersionCom
                  id="android"
                  title="安卓版本"
                  dataSource={reportData.versionDis?.androidModelList}
                />
              )}
          </div>
        </Card>
      }
      {/* 型号分布 */}
      {
        <Card title="型号分布" hoverable={true}>
          <Table<DataType>
            columns={BrandColumns}
            dataSource={data}
            pagination={false}
            footer={() => <CustomPagination {...pagination} onChange={handleTableChange} />}
          />
        </Card>
      }
    </div>
  )
}
export default Distribute
