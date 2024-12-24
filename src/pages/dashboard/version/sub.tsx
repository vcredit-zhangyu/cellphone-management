/*
 * @Author: waghao10
 * @Date: 2023-05-11 17:03:48
 * @Description: 设备版本详情页
 */
import { history, useLocation } from 'umi'
import { Form, Input, InputNumber, Button, message, Spin, Select } from 'antd'
import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { getQueryPrams } from '@/common/utils'
import { addVersion, getEnums, getVersionDetail, updateVersion } from '@/services/api/common'
import { handleEnum } from '../utils'
const Version = () => {
  const curQuery: any = getQueryPrams(useLocation().search)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  const [enumList, setEnumList] = useState({ deviceType: [] })
  const { TextArea } = Input
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  }

  /**
   * @description: 详情
   * @return {*}
   */
  const initData = async () => {
    const _res = await getEnums()
    if (_res) {
      const _hd = handleEnum(_res.data)
      setEnumList(_hd)
    }
    if (curQuery.type === 'edit') {
      setLoading(true)
      const _detail = await getVersionDetail({ versionId: curQuery?.versionId || '' })
      if (_detail) {
        const _detailInfo = _detail?.data
        Object.keys(_detailInfo).forEach((key) => {
          form.setFieldValue(key, _detailInfo[key])
        })
        setLoading(false)
      }
    }
  }


  /**
   * @description: 提交版本
   * @return {*}
   */
  const submit = async () => {
    const _status = await form.validateFields()
    if (_status) {
      setSubmitLoading(true)
      const _formData = form.getFieldsValue()
      // 编辑
      if (curQuery?.type === 'edit') {
        const params = {
          versionId: curQuery?.versionId || '',
          ..._formData
        }
        updateVersion({ ...params }).then((res) => {
          if (res) {
            messageApi.open({
              type: 'success',
              content: '操作成功',
            })
            setSubmitLoading(false)
            history.push('/phone/version')
          }
        }).catch(() => {
          setSubmitLoading(false)
        })
      } else if (curQuery?.type === 'add') {
        // 新增
        addVersion({ ..._formData }).then((res) => {
          if (res) {
            messageApi.open({
              type: 'success',
              content: '操作成功',
            })
            setSubmitLoading(false)
            history.push('/phone/version')
          }
        }).catch(() => {
          setSubmitLoading(false)
        })
      }
    }
  }

  useEffect(() => {
    initData()
  }, [])
  return (
    <div className={styles.detail}>
      <Spin spinning={loading}>
        <Form form={form}  {...layout} style={{ maxWidth: 600 }}>
          <Form.Item name={'appVersion'} label="版本号" rules={[{ required: true, message: '请输入' }]}>
            <InputNumber min={0} precision={0} style={{ width: 250 }} />
          </Form.Item>
          <Form.Item name={'versionRemark'} label="版本介绍">
            <TextArea />
          </Form.Item>
          <Form.Item name={'appPlatform'} label="平台" rules={[{ required: true, message: '请选择' }]}>
            <Select placeholder="请选择" className={styles.w220} options={enumList.deviceType} />
          </Form.Item>
          <Form.Item name={'downloadUrl'} label="强更下载地址" rules={[{ required: true, message: '请输入' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Spin>
      <div className={styles.operator}>
        <Button type="primary" onClick={() => { history.push('/phone/version') }} >返回</Button>
        <Button type="primary" loading={submitLoading} onClick={() => { submit() }} >提交</Button>
      </div>
      {contextHolder}
    </div >
  )
}
export default Version