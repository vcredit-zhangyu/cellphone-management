/*
 * @Author: waghao10
 * @Date: 2023-05-11 17:03:48
 * @Description: 申请记录详情页
 */
import { history, useLocation } from 'umi'
import { Form, Input, Button, message, Spin, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { getQueryPrams } from '@/common/utils'
import { deviceApprove, getApplyInfo, getEnums } from '@/services/api/common'
import { handleEnum } from '../utils'
const ContrastAdd = () => {
  const curQuery: any = getQueryPrams(useLocation().search)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  const [auditForm] = Form.useForm()
  const [enumList, setEnumList] = useState({ deviceType: [], approveResult: [], applyStatus: [], applyType: [], approveReason: [] })
  const [loading, setLoading] = useState(false)
  const { TextArea } = Input
  const [loadings, setLoadings] = useState<boolean>(false)
  const [auditFormData, setAuditFormData]: any = useState({ approveResult: '', approveReason: '' })
  const [auditStatus, setAuditStatus] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [detailInfo, setDetailInfo]: any = useState({})
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  }

  /**
   * @description: 详情
   * @return {*}
   */
  const initData = async () => {
    setLoading(true)
    const _res = await getEnums()
    if (_res) {
      const _hd = handleEnum(_res.data)
      setEnumList(_hd)
    }
    const _detail = await getApplyInfo({ applyId: curQuery?.applyId || '' })
    if (_detail) {
      const _detailInfo = _detail?.data
      Object.keys(_detailInfo).forEach((v) => {
        form.setFieldValue(v, _detailInfo[v])
      })
      setLoading(false)
      setDetailInfo(_detailInfo)
    }
  }

  /**
   * @description: 审核弹框
   * @return {*}
   */
  const submit = () => {
    setAuditStatus(true)
  }

  /**
* @description: 审核结果处理
* @param {number} value
* @return {*}
*/
  const resultChange = () => {
    setAuditFormData(auditForm.getFieldsValue())
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
    if (type) {
      const _formData = auditForm.getFieldsValue()
      auditForm.validateFields().then((status) => {
        setLoadings(true)
        if (status) {
          const _parmas = {
            applyId: curQuery?.applyId || '',
            deviceId: curQuery?.deviceId || '',
            ..._formData,
          }
          setConfirmLoading(true)
          deviceApprove({ ..._parmas }).then((res: any) => {
            if (res.code === 0) {
              setLoadings(false)
              messageApi.open({
                type: 'success',
                content: '操作成功',
              })
              history.push('/phone/apply')
            }
          }).catch(() => {
            setLoadings(false)
          })
        }
      })
    } else {
      resetAuditForm()
    }
  }

  useEffect(() => {
    initData()
  }, [])
  return (
    <div className={styles.detail}>
      <Spin spinning={loading}>
        <Form form={form}  {...layout} style={{ maxWidth: 600 }} disabled={true}>
          <Form.Item name={'applyId'} label="编号">
            <Input />
          </Form.Item>
          <Form.Item name={'applyType'} label="类型">
            <Select placeholder="请选择" className={styles.w220} options={enumList.applyType} />
          </Form.Item>
          <Form.Item name={'deviceName'} label="设备名称">
            <Input />
          </Form.Item>
          <Form.Item name={'deviceNo'} label="设备号">
            <Input />
          </Form.Item>
          <Form.Item name={'applyStatus'} label="申请状态">
            <Select placeholder="请选择" className={styles.w220} options={enumList.applyStatus} />
          </Form.Item>
          {
            (!+curQuery.s && detailInfo.applyStatus === 'approve_refuse') && <Form.Item name={'approveReason'} label="拒绝原因">
              <Select
                style={{ width: 200 }}
                options={enumList.approveReason}
                placeholder="请选择"
              />
            </Form.Item>
          }
          <Form.Item name={'applyTime'} label="申请日期">
            <Input />
          </Form.Item>
          <Form.Item name={'applyPerson'} label="申请人">
            <Input />
          </Form.Item>
          {
            <Form.Item name={'applyReason'} label="申请原因">
              <TextArea placeholder='请输入' disabled />
            </Form.Item>
          }
          {
            !+curQuery.s && <Form.Item name={'approvePerson'} label="审批人">
              <Input />
            </Form.Item>
          }
          <Form.Item name={'createdTime'} label="创建时间">
            <Input />
          </Form.Item>
          <Form.Item name={'updatedTime'} label="更新时间">
            <TextArea />
          </Form.Item>
        </Form>
      </Spin>
      <div className={styles.operator}>
        <Button type="primary" onClick={() => { history.push('/phone/apply') }} >返回</Button>
        {
          !!+curQuery.s && <Button type="primary" loading={loadings} onClick={() => { submit() }} >审核</Button>
        }
      </div>
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
    </div >
  )
}
export default ContrastAdd