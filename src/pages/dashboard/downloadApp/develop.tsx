/*
 * @Author: waghao10
 * @Date: 2024-09-14 13:42:22
 * @Description: 测试环境app
 */
import { Table, Card, Form, Input, Select, Spin, Row, Space, Button, Image } from 'antd'
import { useEffect, useState } from 'react'
import styles from './index.module.less'

import {
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import QRCode from 'qrcode'
import { appDownload } from '@/services/api/common'
import { deviceListItemInterface } from '@/typings'
import { getName } from '../utils'

interface developInterface {
  enumList: any
  initData: any
}

const Develop = (props: developInterface) => {
  const { enumList, initData } = props
  const [dataSource, setDataSource] = useState([])
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [pageObj, setPageObj]: any = useState({ pageSize: 10, currentPage: 1, total: 0 })
  const columns = [
    {
      title: '机型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (_: any, record: any) => {
        return (
          <span>{getName(record.type, enumList.current.deviceType)} </span >
        )
      }
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      width: 100,
    },
    {
      title: '下载地址',
      dataIndex: 'downloadUrl',
      key: 'downloadUrl',
      width: 100,
      render: (text: any, record: any) => {
        return <Image
          width={150}
          src={record.url}
        />
      }
    },
  ]

  /**
* @description: 处理dataSource
* @return {*}
*/
  const handleDataSource = (data: []) => {
    const _newData: any = []
    data.forEach(async (v: any) => {
      const _urlCode = await QRCode.toDataURL(v?.downloadUrl || '')
      const obj = {
        ...v,
        url: _urlCode
      }
      _newData.push(obj)
    })
    setDataSource(_newData)
  }

  /**
   * @description: 搜索
   * @param {any} value
   * @return {*}
   */
  const onSearch = (value: any) => {
    setLoading(true)
    const _newData = {
      ...value,
      currentPage: pageObj.currentPage,
      pageSize: pageObj.pageSize,
      ...form.getFieldsValue()
    }
    appDownload(_newData).then((res: any) => {
      if (res) {

        console.log(res, '====res==')
        handleDataSource(res?.data?.testEvInfo)
        setLoading(false)
      }
    })
  }

  /**
 * @description: 重置
 * @return {*}
 */
  const reset = () => {
    form.resetFields()
    setPageObj({ pageSize: 10, currentPage: 1, total: 0 })
    onSearch({ pageSize: 10, currentPage: 1 })
  }

  /**
* @description: 翻页
* @param {number} page
* @param {number} size
* @return {*}
*/
  const change = (page: number, size: number) => {
    setPageObj((data: any) => {
      const _newData = {
        pageSize: size,
        currentPage: page,
        total: data.total
      }
      return _newData
    })
    onSearch({ pageSize: size, currentPage: page })
  }


  useEffect(() => {
    if (initData && enumList) {
      handleDataSource(initData)
      setPageObj({
        total: initData.length
      })
    }
  }, [initData, enumList])


  return (
    <div className={styles.main}>
      <Card title="" bordered={true}>
        <Form form={form} name="device" className={styles.search}>
          <Row gutter={16} >
            <Form.Item
              name="model"
              label="机型"
            >
              <Select placeholder="请选择" mode="multiple" className={styles.w220} options={[...enumList.current?.deviceType]} />
            </Form.Item>
            <Form.Item
              name="version"
              label="版本"
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" onClick={() => { onSearch({ currentPage: 1, pageSize: pageObj.pageSize }) }} icon={<SearchOutlined />} >
                  查找
                </Button>
                <Button htmlType="button" onClick={reset} icon={<ReloadOutlined />}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Row>
        </Form>
      </Card>
      <Spin spinning={loading}>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={(rowData) => rowData.applyId}
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
    </div>

  )
}

export default Develop