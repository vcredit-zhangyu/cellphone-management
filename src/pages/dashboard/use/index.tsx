/*
 * @Author: waghao10
 * @Date: 2023-05-11 17:03:48
 * @Description: 设备使用记录
 */
import { Button, Form, Input, Row, Space, Select, Spin, Card, Table, Typography, Modal } from 'antd'
import styles from './index.module.less'
import {
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import { deviceUseLog } from '@/services/api/common'
import { getName } from '../utils'
import { deviceUseLogItemInterface } from '@/typings'
import { btnPermission } from './static'
import useCommonEnum from '@/hooks/getCommonEnums'
const Use = () => {
  const [form] = Form.useForm()
  const [dataSource, setDataSoure]: any = useState([])
  const [pageObj, setPageObj] = useState({ pageSize: 10, currentPage: 1, total: 0 })
  const [loading, setLoading] = useState(false)
  // 用户信息
  const userInfo: any = useRef({})
  const { confirm } = Modal
  const { getEnumConfig, enumList } = useCommonEnum()

  /**
 * @description:按钮权限过滤
 * @param {any} list
 * @param {string} role
 * @return {*}
 */
  const handleBtnPermisson = () => {
    // 待审核状态并且是管理员展示审核按钮
    if (userInfo.current.roleList?.[0] === 'vzy_admin') {
      return btnPermission
    } else {
      return []
    }
  }

  /**
 * @description: 按钮执行逻辑（删除）
 * @param {string} key
 * @param {any} row
 * @return {*}
 */
  const handleOperator = (key: string, row: deviceUseLogItemInterface) => {
    switch (key) {
      case 'del':
        confirm({
          title: '提示',
          content: '是否确认删除，删除后不在展示此记录',
          onOk() {

          },
          onCancel() {

          },
        })
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
      title: '设备号',
      dataIndex: 'deviceNo',
      key: 'deviceNo',
      fixed: 'left',
      width: 150,
    },
    {
      title: '机型',
      dataIndex: 'deviceType',
      key: 'deviceType',
      width: 80,
      render: (_: any, record: deviceUseLogItemInterface) => {
        return (
          <span>{getName(record.deviceType, enumList.current?.deviceType)} </span >
        )
      }
    },
    {
      title: '名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      width: 120,
    },
    {
      title: '系统',
      dataIndex: 'deviceSystem',
      key: 'deviceSystem',
      width: 140,
    },
    {
      title: '系统版本',
      dataIndex: 'deviceSystemVersion',
      key: 'deviceSystemVersion',
      width: 120,
    },
    {
      title: 'app',
      dataIndex: 'app',
      key: 'app',
      width: 100,
      render: (_: any, record: deviceUseLogItemInterface) => {
        return (
          <span>{getName(record.app, enumList.current?.app)} </span >
        )
      }
    },
    {
      title: '负责人',
      dataIndex: 'deviceCharge',
      key: 'deviceCharge',
      width: 120,
    },
    {
      title: '最新使用时间',
      dataIndex: 'appTime',
      key: 'appTime',
      width: 160,
    },
    // {
    //   title: '操作',
    //   fixed: 'right',
    //   width: 120,
    //   render: (_: any, record: deviceUseLogItemInterface) => {
    //     return (
    //       <span>
    //         {
    //           (handleBtnPermisson() || []).map((v: any) => {
    //             return (
    //               <Typography.Link key={v.applyId} onClick={() => { handleOperator(v.key, record) }} style={{ marginRight: 8 }}>
    //                 {v.label}
    //               </Typography.Link>
    //             )
    //           })
    //         }
    //       </span>
    //     )
    //   }
    // }
  ]

  /**
   * @description: 查找
   * @param {any} value
   * @return {*}
   */
  const onSearch = (value: any) => {
    setLoading(true)
    setDataSoure([])
    const _formData = form.getFieldsValue()
    const params = {
      ...value,
      ..._formData,
    }
    delete params.total
    deviceUseLog({ ...params }).then((res: any) => {
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
    onSearch({ currentPage: 1, pageSize: 10 })
  }

  /**
   * @description: 初始化列表
   * @return {*}
   */
  const initData = () => {
    getEnumConfig()
    onSearch({ currentPage: 1, pageSize: 10 })
  }

  useEffect(() => {
    initData()
  }, [])

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
              name="deviceType"
              label="机型"
            >
              <Select placeholder="请选择" className={styles.w220} options={enumList.current?.deviceType} />
            </Form.Item>
            <Form.Item
              name="app"
              label="app"
            >
              <Select placeholder="请选择" className={styles.w220} options={enumList.current?.app} />
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
            scroll={{ x: 1200 }}
            dataSource={dataSource}
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
export default Use