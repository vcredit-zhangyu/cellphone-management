/*
 * @Author: waghao10
 * @Date: 2023-05-11 17:03:48
 * @Description: 设备版本管理
 */
import { Button, Form, Spin, Card, Table, Typography, Tooltip } from 'antd'
import styles from './index.module.less'
import {
  PlusOutlined
} from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import { getVerisonList } from '@/services/api/common'
import { versionItemInterface } from '@/typings'
import { history } from 'umi'
const Use = () => {
  const [form] = Form.useForm()
  const [dataSource, setDataSoure]: any = useState([])
  const [pageObj, setPageObj] = useState({ pageSize: 10, currentPage: 1, total: 0 })
  const [loading, setLoading] = useState(false)
  // 用户信息
  const userInfo: any = useRef({})

  /**
 * @description: 操作
 * * @param {any} key
 * @param {any} row
 * @return {*}
 */
  const handleOperator = (key: string, row?: versionItemInterface) => {
    switch (key) {
      case 'edit':
        history.push(`/phone/version/sub?type=edit&versionId=${row?.versionId}`)
        break
      case 'add':
        history.push('/phone/version/sub?type=add')
        break
      default:
        break
    }
  }

  /**
   * @description: 表头
   * @return {*}
   */
  const columns: any = [
    {
      title: '版本号',
      dataIndex: 'appVersion',
      key: 'appVersion',
      fixed: 'left',
      width: 120,
    },
    {
      title: '版本介绍',
      dataIndex: 'versionRemark',
      key: 'versionRemark',
      width: 180,
    },
    {
      title: '平台',
      dataIndex: 'appPlatform',
      key: 'appPlatform',
      width: 120,
    },
    {
      title: '强更下载地址',
      dataIndex: 'downloadUrl',
      key: 'downloadUrl',
      width: 170,
      ellipsis: {
        showTitle: false,
      },
      render: (downloadUrl: any) => (
        <Tooltip placement="topLeft" title={downloadUrl}>
          {downloadUrl}
        </Tooltip>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
      width: 160,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedTime',
      key: 'updatedTime',
      width: 160,
    },
    {
      title: '操作',
      fixed: 'right',
      align: 'center',
      width: 80,
      render: (_: any, record: versionItemInterface) => {
        return (
          <Typography.Link onClick={() => { handleOperator('edit', record) }} style={{ marginRight: 8 }}>
            更改
          </Typography.Link>
        )
      }
    }
  ]

  /**
   * @description: 查找
   * @param {any} value
   * @return {*}
   */
  const onSearch = (value: any) => {
    setLoading(true)
    setDataSoure([])
    const params = {
      ...value
    }
    delete params.total
    getVerisonList({ ...params }).then((res: any) => {
      if (res) {
        setLoading(false)
        setPageObj((data) => {
          return {
            ...data,
            total: res.data?.total
          }
        })
        setDataSoure(res?.data?.records || [])
      }
    })
  }

  /**
* @description: 翻页
* @param {number} page
* @param {number} size
* @return {*}
*/
  const change = (page: number, size: number) => {
    onSearch({ pageSize: size, currentPage: page })
  }

  /**
   * @description: 初始化列表
   * @return {*}
   */
  const initData = () => {
    onSearch({ currentPage: 1, pageSize: 10 })
  }

  useEffect(() => {
    try {
      userInfo.current = JSON.parse(window.localStorage.USERINFO)
    } catch (err) {
      userInfo.current = {}
    }
    initData()
  }, [])
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <p>提示：app版本小于以下配置版本，执行强更</p>
        <Button onClick={() => { handleOperator('add') }} type="primary" icon={<PlusOutlined />}>添加版本信息</Button>
      </div>
      <Card title="" bordered={true}>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            scroll={{ x: 1200 }}
            dataSource={dataSource}
            rowClassName="editable-row"
            rowKey={(rowData) => rowData.versionId}
            pagination={{
              onChange: (page: number, size: number) => {
                change(page, size)
              },
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: () => `总共${pageObj.total}条`,
              pageSize: pageObj.pageSize,
              total: pageObj.total,
              current: pageObj.currentPage
            }}
          />
        </Spin>
      </Card>
    </div>
  )
}
export default Use