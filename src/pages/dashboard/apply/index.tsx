/*
 * @Author: waghao10
 * @Date: 2023-05-11 17:03:48
 * @Description: 设备申请记录
 */
import { Button, Form, Input, Row, Space, Select, Card, message, Spin, Table, Typography, DatePicker, Modal } from 'antd'
import styles from './index.module.less'
import { history } from 'umi'
import { btnPermission } from './static'
import {
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import { deviceApplyLogItemInterface } from '@/typings'
import { deviceApplyList, deviceApprove, getEnums } from '@/services/api/common'
import moment from 'moment'
import { getName, handleEnum } from '../utils'
const Apply = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  const [auditForm] = Form.useForm()
  const [dataSource, setDataSoure]: any = useState([])
  const [pageObj, setPageObj] = useState({ pageSize: 10, currentPage: 1, total: 0 })
  const { RangePicker } = DatePicker
  const [auditStatus, setAuditStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [auditFormData, setAuditFormData]: any = useState({ approveResult: '', approveReason: '' })
  const curApplyInfo: any = useRef({} as deviceApplyLogItemInterface)
  const [enumList, setEnumList]: any = useState({ approveResult: [], approveReason: [], applyStatus: [], applyType: [] })
  // 用户信息
  const userInfo: any = useRef({})
  const [confirmLoading, setConfirmLoading] = useState(false)

  /**
   * @description: 审核按钮权限
   * @param {string} role
   * @return {*}
   */
  const verifyPermission = (role: string) => {
    if (role === 'wait_audit' && userInfo.current.roleList?.[0] === 'vzy_admin') {
      return 1
    } else {
      return 0
    }
  }

  /**
   * @description:按钮权限过滤
   * @param {any} list
   * @param {string} role
   * @return {*}
   */
  const handleBtnPermisson = (status: any) => {
    // 待审核状态并且是管理员展示审核按钮
    if (verifyPermission(status)) {
      return btnPermission
    } else {
      const _btnPermission = btnPermission.filter((v: any) => v.key !== 'audit')
      return _btnPermission
    }
  }


  /**
   * @description: 按钮执行逻辑（审核、详情）
   * @param {string} key
   * @param {any} row
   * @return {*}
   */
  const handleOperator = (key: string, row: deviceApplyLogItemInterface) => {
    curApplyInfo.current = row
    switch (key) {
      case 'audit':
        setAuditStatus(true)
        break
      case 'detail':
        history.push(`/phone/apply/sub?type=detail&applyId=${row.applyId}&deviceId=${row.deviceId}&s=${verifyPermission(row.applyStatus)}`)
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
      title: '编号',
      dataIndex: 'applyId',
      key: 'applyId',
      fixed: 'left',
      width: 180,
    },
    {
      title: '类型',
      dataIndex: 'applyType',
      key: 'applyType',
      width: 80,
      render: (_: any, record: deviceApplyLogItemInterface) => {
        return (
          <span>{
            getName(record.applyType, enumList.applyType)
          } </span >
        )
      }
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      width: 160,
    },
    {
      title: '申请状态',
      dataIndex: 'applyStatus',
      key: 'applyStatus',
      width: 120,
      render: (_: any, record: deviceApplyLogItemInterface) => {
        return (
          <span>{
            getName(record.applyStatus, enumList.applyStatus)
          } </span >
        )
      }
    },
    {
      title: '拒绝原因',
      dataIndex: 'approveReason',
      key: 'approveReason',
      width: 140,
      render: (_: any, record: deviceApplyLogItemInterface) => {
        return (
          <span>{
            getName(record.approveReason, enumList.approveReason)
          } </span >
        )
      }
    },
    {
      title: '申请日期',
      dataIndex: 'applyTime',
      key: 'applyTime',
      width: 160,
    },
    {
      title: '申请人',
      dataIndex: 'applyPerson',
      key: 'applyPerson',
      width: 120,
    },
    {
      title: '审批人',
      dataIndex: 'approvePerson',
      key: 'approvePerson',
      width: 120,
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
      width: 120,
      render: (_: any, record: deviceApplyLogItemInterface) => {
        return (
          <span>
            {
              (handleBtnPermisson(record.applyStatus) || []).map((v: any) => {
                return (
                  <Typography.Link key={v.key} onClick={() => { handleOperator(v.key, record) }} style={{ marginRight: 8 }}>
                    {v.label}
                  </Typography.Link>
                )
              })
            }
          </span>
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
    const _formData = form.getFieldsValue()
    const params = {
      ...value,
      ..._formData,
      applyTimeBegin: '',
      applyTimeEnd: '',
      applyPersonAcct: userInfo.current?.roleList?.[0] === 'vzy_admin' ? '' : userInfo.current?.userAccount
    }
    // 申请日期格式化
    if (_formData.applyDate && _formData.applyDate.length > 0) {
      params.applyTimeBegin = moment(new Date(params.applyDate?.[0])).format('YYYY-MM-DD')
      params.applyTimeEnd = moment(new Date(params.applyDate?.[1])).format('YYYY-MM-DD')
    }
    delete params.total
    delete params.applyDate
    deviceApplyList({ ...params }).then((res: any) => {
      if (res) {
        setLoading(false)
        setPageObj((data) => {
          return {
            ...data,
            total: res.data?.total || 0
          }
        })
        setDataSoure(res.data?.records || [])
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
   * @description: 重置form
   * @return {*}
   */
  const resetAuditForm = () => {
    auditForm.resetFields()
    setAuditFormData({ approveResult: '', approveReason: '' })
    setAuditStatus(false)
    setConfirmLoading(false)
  }

  /**
   * @description: 审核弹框
   * @param {boolean} type
   * @return {*}
   */
  const handleAudit = (type: boolean) => {
    const _formData = auditForm.getFieldsValue()
    if (type) {
      auditForm.validateFields().then((status) => {
        if (status) {
          const _parmas = {
            applyId: curApplyInfo.current.applyId || '',
            deviceId: curApplyInfo.current.deviceId || '',
            ..._formData,
          }
          setConfirmLoading(true)
          deviceApprove({ ..._parmas }).then((res: any) => {
            if (res.code === 0) {
              messageApi.open({
                type: 'success',
                content: '操作成功',
              })
              resetAuditForm()
              onSearch({ currentPage: 1, pageSize: 10 })
            }
          }).catch(() => {
            setLoading(false)
          })
        }
      })
    } else {
      resetAuditForm()
    }
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

  /**
   * @description: 审核结果处理
   * @param {number} value
   * @return {*}
   */
  const resultChange = () => {
    setAuditFormData(auditForm.getFieldsValue())
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
      <Card title="" bordered={true}>
        <Form form={form} name="device" className={styles.search}>
          <Row gutter={16} >
            <Form.Item
              name="applyType"
              label="类型"
            >
              <Select placeholder="请选择" className={styles.w220} options={enumList.applyType} />
            </Form.Item>
            <Form.Item
              name="applyStatus"
              label="申请状态"
            >
              <Select placeholder="请选择" className={styles.w220} options={enumList.applyStatus} />
            </Form.Item>
            <Form.Item
              name="applyDate"
              label="申请日期"
            >
              <RangePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              name="applyPerson"
              label="申请人"
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
      <Card title="" bordered={true}>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            scroll={{ x: 1300 }}
            dataSource={dataSource}
            rowClassName="editable-row"
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
      </Card>
      <Modal title="审核" open={auditStatus} onOk={() => handleAudit(true)} onCancel={() => handleAudit(false)} confirmLoading={confirmLoading}>
        <Form form={auditForm}>
          <Form.Item
            name="approveResult"
            label="审核结果"
            rules={[{ required: true, message: '请选择' }]}
          >
            <Select
              style={{ width: 200 }}
              options={enumList.approveResult}
              placeholder="请选择"
              onChange={() => resultChange()}
            />
          </Form.Item>
          {
            auditFormData.approveResult === 'approve_refuse' &&
            <Form.Item
              name="approveReason"
              label="拒绝原因"
              rules={[{ required: true, message: '请选择' }]}
            >
              <Select
                style={{ width: 200 }}
                options={enumList.approveReason}
                placeholder="请选择"
              />
            </Form.Item>
          }
        </Form>
      </Modal>
      {contextHolder}
    </div>
  )
}
export default Apply