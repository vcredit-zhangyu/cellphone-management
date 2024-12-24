/*
 * @Author: waghao10
 * @Date: 2023-05-11 17:03:48
 * @Description: 设备变更记录
 */
import { Button, Form, Input, Row, Space, Select, Card, Spin, Table } from 'antd'
import styles from './index.module.less'
import {
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { deviceUpdateLog, getEnums } from '@/services/api/common'
import { handleEnum } from '../utils'
import { deviceUpdateLogItemInterface } from '@/typings'
const Update = () => {
  const [form] = Form.useForm()
  const [dataSource, setDataSoure]: any = useState([])
  const [pageObj, setPageObj] = useState({ pageSize: 10, currentPage: 1, total: 0 })
  const [loading, setLoading] = useState(false)
  const [enumList, setEnumList] = useState({ operPerson: [] })


  /**
   * @description: 表头
   * @return {*}
   */
  const columns: any = [
    {
      title: '设备号',
      dataIndex: 'deviceNo',
      key: 'deviceNo',
      fixed: 'left',
      width: 170
    },
    {
      title: '名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      width: 150,
    },
    {
      title: '操作者',
      dataIndex: 'operPerson',
      key: 'operPerson',
      width: 120,
    },
    {
      title: '更新时间',
      dataIndex: 'operTime',
      key: 'operTime',
      width: 160,
    },
    {
      title: '更新详情',
      dataIndex: 'operDetail',
      key: 'operDetail',
      render: (_: any, record: deviceUpdateLogItemInterface) => {
        return (
          <div dangerouslySetInnerHTML={{ __html: record.operDetail }} />
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
    const _formData = form.getFieldsValue()
    const params = {
      ...value,
      ..._formData,
    }
    delete params.total
    setDataSoure([])
    deviceUpdateLog({ ...params }).then((res: any) => {
      if (res) {
        setLoading(false)
        setPageObj((data) => {
          return {
            ...data,
            total: res.data?.total
          }
        })
        setDataSoure(res.data?.records)
      }
    }).catch(() => {
      setLoading(false)
    })
  }

  /**
  * @description: 翻页
  * @param {number} page
  * @param {number} size
  * @return {*}
  */
  const change = (page: number, size: number) => {
    setPageObj((data) => {
      const _newData = {
        pageSize: size,
        currentPage: page,
        total: data.total
      }
      return _newData
    })
    onSearch({ pageSize: size, currentPage: page })
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
   * @description: 初始化列表
   * @return {*}
   */
  const initData = () => {
    getEnums().then((res: any) => {
      if (res) {
        const _hd = handleEnum(res.data)
        setEnumList(_hd)
        onSearch({ currentPage: 1, pageSize: 10 })
      }
    }).catch(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    initData()
  }, [])
  return (
    <div className={styles.main}>
      <Card title="" bordered={true}>
        <Form form={form} name="device" className={styles.search}>
          <Row gutter={16} >
            <Form.Item
              name="deviceNo"
              label="设备号"
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name="deviceName"
              label="设备名称"
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name="operPerson"
              label="操作者"
            >
              {/* <Select placeholder="请选择" className={styles.w220} options={enumList.operPerson} /> */}
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
      <Card title="" bordered={true}>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 800 }}
            rowClassName="editable-row"
            rowKey={(rowData) => rowData.deviceNo}
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
export default Update