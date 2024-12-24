/*
 * @Author: waghao10
 * @Date: 2023-05-11 17:03:48
 * @Description: 设备管理
 */
import {
  deviceApply,
  deviceStatusUpdate,
  explainDetail,
  explainEdit,
  getDeviceList,
  getEnums,
} from '@/services/api/common'
import { deviceListItemInterface } from '@/typings'
import {
  FileOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Typography,
} from 'antd'
import { useEffect, useRef, useState } from 'react'
import { history } from 'umi'
import { getName, handleEnum } from '../utils'
import EditorCom from './editor'
import styles from './index.module.less'
import { btnPermission } from './static'
import BatchUploadCom from './uploadModal'

const ContrastAdd = () => {
  const { confirm } = Modal
  const [form] = Form.useForm()
  const [applyForm] = Form.useForm()
  const [illustrateForm]: any = Form.useForm()
  const [dataSource, setDataSoure]: any = useState([])
  const [pageObj, setPageObj] = useState({ pageSize: 10, currentPage: 1, total: 0 })
  const [applyStatus, setApplyStatus] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const curDeviceInfo: any = useRef({} as deviceListItemInterface)
  const [enumList, setEnumList] = useState({
    deviceType: [],
    deviceStatus: [],
    borrowTerm: [],
    iosSystem: [],
    androidSystem: [],
  })
  const [loading, setLoading] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [illustrateModalStatus, setIllustrateModalStatus] = useState(false)
  const [illustrateHtml, setIllustrateHtml] = useState('')
  const editorRef: any = useRef()
  const { TextArea } = Input

  // 用户信息
  const userInfo: any = useRef({})

  const isAdmin = () => {
    return userInfo.current.roleList?.[0] === 'vzy_admin'
  }

  /**
   * @description:按钮权限过滤
   * @param {any} list
   * @param {string} role
   * @return {*}
   */
  const handleBtnPermisson = (list: any, record: deviceListItemInterface) => {
    // 首先要和当前的负责人作比对，比对成功，按照负责人权限配置按钮；否则按照当前角色权限配置
    let _role = userInfo.current.roleList?.[0]
    const _status = record.deviceChargeAcct === userInfo.current.userAccount
    // 比对成功按照负责人权限配置
    if (_status) _role = 'pic'
    if (list && list.length > 0) {
      const _list = list.filter((v: any) => v[_role])
      return _list
    } else {
      return []
    }
  }

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
      deviceType: _formData.deviceType && _formData.deviceType.join(','),
      deviceStatus: _formData.deviceStatus && _formData.deviceStatus.join(','),
    }
    delete params.total
    getDeviceList({ ...params })
      .then((res: any) => {
        if (res) {
          setLoading(false)
          setPageObj((data) => {
            return {
              ...data,
              total: res.data.total,
            }
          })
          setDataSoure(res.data.records || [])
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  /**
   * @description: 更新table
   * @return {*}
   */
  const updateTable = () => {
    setPageObj({ pageSize: 10, currentPage: 1, total: 0 })
    onSearch({ currentPage: 1, pageSize: 10 })
  }

  /**
   * @description: 按钮执行逻辑
   * @param {string} key
   * @param {any} row
   * @return {*}
   */
  const handleOperator = (key: string, row?: deviceListItemInterface) => {
    curDeviceInfo.current = row
    switch (key) {
      case 'detail':
        history.push(`/phone/device/sub?type=detail&deviceId=${row?.deviceId}`)
        break
      case 'abandon':
        confirm({
          title: '提示',
          content: '是否确认废弃，废弃后不可编辑修改',
          onOk() {
            deviceStatusUpdate({
              deviceId: curDeviceInfo.current.deviceId || '',
              updateType: 'void',
            })
              .then((res: any) => {
                if (res.code === 0) {
                  messageApi.open({
                    type: 'success',
                    content: '废弃成功',
                  })
                  onSearch({ currentPage: 1, pageSize: 10 })
                }
              })
              .catch(() => {
                setLoading(false)
              })
          },
          onCancel() {},
        })
        break
      case 'update':
        history.push(`/phone/device/sub?type=edit&deviceId=${row?.deviceId}`)
        break
      case 'apply':
        applyForm.resetFields()
        setApplyStatus(true)
        break
      case 'delayAudit':
        applyForm.resetFields()
        setApplyStatus(true)
        break
      case 'back':
        confirm({
          title: '提示',
          content: '是否确认归还',
          onOk() {
            deviceApply({
              deviceId: curDeviceInfo.current.deviceId || '',
              applyType: 'return',
            })
              .then((res: any) => {
                if (res.code === 0) {
                  messageApi.open({
                    type: 'success',
                    content: '操作成功',
                  })
                  onSearch({ currentPage: 1, pageSize: 10 })
                }
              })
              .catch(() => {
                setLoading(false)
              })
          },
          onCancel() {
            //
          },
        })
        break
      case 'add':
        history.push('/phone/device/sub?type=add')
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
      title: '机型',
      dataIndex: 'deviceType',
      key: 'deviceType',
      fixed: 'left',
      width: 100,
      render: (_: any, record: deviceListItemInterface) => {
        return <span>{getName(record.deviceType, enumList.deviceType)} </span>
      },
    },
    {
      title: '名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      width: 100,
    },
    {
      title: '设备号',
      dataIndex: 'deviceNo',
      key: 'deviceNo',
      width: 140,
    },
    {
      title: '型号',
      dataIndex: 'deviceModel',
      key: 'deviceModel',
      width: 100,
    },
    {
      title: '系统',
      dataIndex: 'deviceSystem',
      key: 'deviceSystem',
      width: 80,
      render: (_: any, record: deviceListItemInterface) => {
        return (
          <span>
            {getName(record.deviceSystem, [...enumList.iosSystem, ...enumList.androidSystem])}{' '}
          </span>
        )
      },
    },
    {
      title: '系统版本',
      dataIndex: 'deviceSystemVersion',
      key: 'deviceSystemVersion',
      width: 80,
    },
    {
      title: '负责人',
      dataIndex: 'deviceCharge',
      key: 'deviceCharge',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'deviceStatus',
      key: 'deviceStatus',
      width: 80,
      render: (_: any, record: deviceListItemInterface) => {
        return <span>{getName(record.deviceStatus, enumList.deviceStatus)} </span>
      },
    },
    {
      title: '申请到期日',
      dataIndex: 'expireDate',
      key: 'expireDate',
      width: 150,
    },
    {
      title: '操作',
      fixed: 'right',
      width: 160,
      key: 'operator',
      render: (_: any, record: deviceListItemInterface) => {
        return (
          <span>
            {(handleBtnPermisson(btnPermission[record.deviceStatus], record) || []).map(
              (v: any, i: any) => {
                return (
                  <Typography.Link
                    key={i}
                    onClick={() => {
                      handleOperator(v.key, record)
                    }}
                    style={{ marginRight: 8 }}
                  >
                    {v.label}
                  </Typography.Link>
                )
              },
            )}
          </span>
        )
      },
    },
  ]

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
        total: data.total,
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
   * @description: 重置form
   * @return {*}
   */
  const resetApplyForm = () => {
    applyForm.resetFields()
    setApplyStatus(false)
    setPageObj({ pageSize: 10, currentPage: 1, total: 0 })
    setConfirmLoading(false)
  }

  /**
   * @description: 初始化列表
   * @return {*}
   */
  const initData = () => {
    getEnums()
      .then((res: any) => {
        if (res) {
          const _hd = handleEnum(res.data)
          setEnumList(_hd)
          onSearch({ currentPage: 1, pageSize: 10 })
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  /**
   * @description: 申请弹框处理
   * @param {*} type
   * @return {*}
   */
  const handleApply = (type: boolean) => {
    if (type) {
      applyForm.validateFields().then((status) => {
        if (status) {
          const params = {
            ...applyForm.getFieldsValue(),
            applyType: 'borrow',
            deviceId: curDeviceInfo.current.deviceId || '',
          }
          setConfirmLoading(true)
          deviceApply({ ...params }).then((res: any) => {
            if (res.code === 0) {
              messageApi.open({
                type: 'success',
                content: '申请成功',
              })
            }
            resetApplyForm()
            onSearch({ currentPage: 1, pageSize: 10 })
          })
        }
      })
    } else {
      resetApplyForm()
    }
  }

  /**
   * @description: 关闭上传modal弹框
   * @return {*}
   */
  const closeUploadModal = () => {
    setOpenModal(false)
  }

  /**
   * @description: 更新的html
   * @return {*}
   */
  const updateHtml = (html: any) => {
    setIllustrateHtml(html)
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
          <Row gutter={16}>
            <Form.Item name="deviceType" label="机型">
              <Select
                placeholder="请选择"
                mode="multiple"
                className={styles.w220}
                options={enumList.deviceType}
              />
            </Form.Item>
            <Form.Item name="deviceName" label="名称">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="deviceNo" label="设备号">
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item name="deviceCharge" label="负责人">
              <Input placeholder="请输入" />
            </Form.Item>
            {/* <Form.Item name="deviceCharge1" label="系统">
              <Select
                placeholder="请选择"
                mode="multiple"
                className={styles.w220}
                options={[...enumList.iosSystem, ...enumList.androidSystem]}
              />
            </Form.Item> */}
            {/* <Form.Item name="deviceCharge2" label="系统版本">
              <Input placeholder="请输入" />
            </Form.Item> */}
          </Row>
          <Row gutter={16}>
            {/* <Form.Item name="deviceCharge3" label="型号">
              <Input placeholder="请输入" />
            </Form.Item> */}
            <Form.Item name="deviceStatus" label="状态">
              <Select
                placeholder="请选择"
                mode="multiple"
                className={styles.w220}
                options={enumList.deviceStatus}
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    onSearch({ currentPage: 1, pageSize: pageObj.pageSize })
                  }}
                  icon={<SearchOutlined />}
                >
                  查找
                </Button>
                <Button htmlType="button" onClick={reset} icon={<ReloadOutlined />}>
                  重置
                </Button>
                {userInfo.current?.roleList?.[0] === 'vzy_admin' && (
                  <Button
                    htmlType="button"
                    onClick={() => handleOperator('add')}
                    icon={<PlusOutlined />}
                  >
                    新增设备
                  </Button>
                )}
                {isAdmin() && (
                  <Button
                    htmlType="button"
                    onClick={() => {
                      setOpenModal(true)
                    }}
                    icon={<UploadOutlined />}
                  >
                    批量添加
                  </Button>
                )}
                <Button
                  htmlType="button"
                  onClick={async () => {
                    const _res = await explainDetail()
                    if (_res) {
                      setIllustrateHtml(_res.data)
                    }
                    setIllustrateModalStatus(true)
                  }}
                  icon={<FileOutlined />}
                >
                  申请操作手册
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
            rowKey={(rowData) => rowData.deviceId}
            pagination={{
              onChange: (page: number, size: number) => {
                change(page, size)
              },
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: () => `总共${pageObj.total}条`,
              pageSize: pageObj.pageSize,
              total: pageObj.total,
              current: pageObj.currentPage,
            }}
          />
        </Spin>
      </Card>
      <Modal
        title="申请"
        open={applyStatus}
        onOk={() => handleApply(true)}
        onCancel={() => handleApply(false)}
        confirmLoading={confirmLoading}
      >
        <Form form={applyForm} labelCol={{ span: 5 }}>
          <Form.Item
            name="applyPeriod"
            label="期限"
            rules={[{ required: true, message: '请选择' }]}
            // defaultValue="1个月" // 设置默认值为“一个月”
          >
            <Select
              style={{ width: 200 }}
              options={enumList.borrowTerm}
              placeholder={'请选择'}
              defaultValue="one_month"
            />
          </Form.Item>
          <Form.Item
            name="applyReason"
            label="申请原因"
            rules={[{ required: true, message: '请选择' }]}
          >
            <Input.TextArea showCount maxLength={100} />
            {/* <TextArea maxLength={100} /> */}
          </Form.Item>
          <p className={styles.msg}>申请到设备请妥善保管，如损坏，丢失将追究赔偿责任</p>
          <p className={styles.msg}>如设备不再使用，请及时归还</p>
        </Form>
      </Modal>
      <BatchUploadCom
        openModal={openModal}
        closeModal={closeUploadModal}
        updateTable={updateTable}
      />
      {/* 申请说明弹框 */}
      <Modal
        title="申请操作手册"
        className={`${styles.fullScreen}`}
        bodyStyle={{ height: 'calc(100vh - 70px - 53px)' }}
        open={illustrateModalStatus}
        footer={null}
        // onOk={() => {
        //   if (!isAdmin()) {
        //     messageApi.open({
        //       type: 'warning',
        //       content: '非管理员无法',
        //     })
        //     return
        //   }
        //   explainEdit({
        //     content: illustrateHtml,
        //   }).then((res) => {
        //     if (res) {
        //       setIllustrateHtml('')
        //       setIllustrateModalStatus(false)
        //     }
        //   })
        // }}
        // onCancel={() => {
        //   setIllustrateHtml('')
        //   setIllustrateModalStatus(false)
        // }}
      >
        <Form labelCol={{ span: 5 }}>
          <EditorCom ref={editorRef} defaultHtml={illustrateHtml} updateHtml={updateHtml} />
        </Form>
        <div style={{ backgroundColor: '#fff', textAlign: 'right', padding: '10px 0' }}>
          <Button
            style={{ marginRight: '10px' }}
            type="primary"
            onClick={() => {
              if (!isAdmin()) {
                messageApi.open({
                  type: 'warning',
                  content: '非管理员无法编辑',
                })
                return
              }
              explainEdit({
                content: illustrateHtml,
              }).then((res) => {
                if (res) {
                  setIllustrateHtml('')
                  setIllustrateModalStatus(false)
                }
              })
            }}
          >
            确定
          </Button>
          <Button
            onClick={() => {
              setIllustrateHtml('')
              setIllustrateModalStatus(false)
            }}
          >
            取消
          </Button>
        </div>
      </Modal>
      {contextHolder}
    </div>
  )
}
export default ContrastAdd
