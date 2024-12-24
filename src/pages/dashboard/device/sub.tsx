/*
 * @Author: waghao10
 * @Date: 2023-05-11 17:03:48
 * @Description: 设备详情页
 */
import { history, useLocation } from 'umi'
import { Form, Input, Button, message, DatePicker, Select, Spin } from 'antd'
import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { getQueryPrams } from '@/common/utils'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { addDevice, deviceUpdate, getDeviceDetail, getEnums } from '@/services/api/common'
import moment from 'moment'
import { handleEnum } from '../utils'
const ContrastAdd = () => {
  const curQuery = getQueryPrams(useLocation().search)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  const [enumList, setEnumList] = useState({ deviceType: [], brand: [], androidSystem: [], iosSystem: [], iosBrand: [] })
  const [loading, setLoading] = useState(false)
  const [dynamicVerifyFields, setDynamicVerifyFields] = useState({ IMEIStatus: false, deviceSerialNoStatus: false })
  const { TextArea } = Input
  const [loadings, setLoadings] = useState<boolean>(false)
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  dayjs.extend(customParseFormat)
  dayjs.extend(advancedFormat)
  dayjs.extend(weekday)
  dayjs.extend(localeData)
  dayjs.extend(weekOfYear)
  dayjs.extend(weekYear)

  /**
   * @description: 详情
   * @return {*}
   */
  const initData = () => {
    getEnums().then((res: any) => {
      if (res) {
        const _hd = handleEnum(res.data)
        setEnumList(_hd)
        if (curQuery.type !== 'add') {
          setLoading(true)
          getDeviceDetail({ deviceId: curQuery.deviceId || '' }).then((resd: any) => {
            const _data = resd.data
            if (_data) {
              setLoading(false)
              Object.keys(_data).forEach((v: string) => {
                if (['expireDate', 'createdTime', 'updatedTime'].includes(v)) {
                  if (v === 'expireDate') {
                    form.setFieldValue(v, _data[v] ? dayjs(_data[v], 'YYYY-MM-DD') : '')
                  } else {
                    form.setFieldValue(v, _data[v] ? dayjs(_data[v], 'YYYY-MM-DD HH:mm:ss') : '')
                  }

                } else {
                  form.setFieldValue(v, _data[v])
                }
              })
              if (_data.deviceType === 'ios') {
                setDynamicVerifyFields({ IMEIStatus: false, deviceSerialNoStatus: true })
              } else {
                setDynamicVerifyFields({ IMEIStatus: true, deviceSerialNoStatus: false })
              }
            }
          })
        } else {
          form.setFieldValue('deviceType', 'android')
          setDynamicVerifyFields({ IMEIStatus: true, deviceSerialNoStatus: false })
        }
      }
    })
  }


  /**
   * @description: 更新设备
   * @return {*}
   */
  const updateDevice = async () => {
    const _status = await form.validateFields()
    setLoadings(true)
    if (_status) {
      const _data = form.getFieldsValue()
      if (curQuery.type === 'add') {
        addDevice({
          ..._data,
        }).then((res: any) => {
          if (res.code === 0) {
            messageApi.open({
              type: 'success',
              content: '操作成功',
            })
            history.push('/phone/device')
          } else {
            messageApi.open({
              type: 'error',
              content: res.msg,
            })
          }
          setLoadings(false)
        })
      }
      if (curQuery.type === 'edit') {
        deviceUpdate({
          ..._data,
          deviceId: curQuery.deviceId || '',
          expireDate: _data.expireDate ? moment(new Date(_data.expireDate)).format('YYYY-MM-DD') : ''
        }).then((res: any) => {
          if (res) {
            messageApi.open({
              type: 'success',
              content: '操作成功',
            })
            history.push('/phone/device')
          }
          setLoadings(false)
        })
      }
    }
  }

  /**
   * @description: 机型
   * @param {string} type
   * @return {*}
   */
  const changeDeviceType = (type: string) => {
    form.setFields([{ name: 'deviceSystem', value: '' }, { name: 'deviceBrand', value: '' }, { name: 'deviceImei', value: '' }, { name: 'deviceSerialNo', value: '' }])
    if (type === 'ios') {
      // 移除校验提示信息
      form.setFields([{ name: 'deviceImei', errors: [] }])
      setDynamicVerifyFields({ IMEIStatus: false, deviceSerialNoStatus: true })
    } else {
      form.setFields([{ name: 'deviceSerialNo', errors: [] }])
      setDynamicVerifyFields({ IMEIStatus: true, deviceSerialNoStatus: false })
    }
  }

  useEffect(() => {
    initData()
  }, [])
  return (
    <div className={styles.detail}>
      <Spin spinning={loading}>
        <Form form={form}  {...layout} style={{ maxWidth: 600 }} disabled={curQuery.type === 'detail'}>
          <Form.Item name={'deviceType'} label="机型">
            <Select placeholder="请选择" className={styles.w220} options={enumList.deviceType} onChange={changeDeviceType} />
          </Form.Item>
          <Form.Item name={'deviceName'} label="名称" rules={[{ required: true, message: '请输入名称' }]}>
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item name={'deviceBrand'} label="品牌">
            <Select placeholder="请选择" className={styles.w220} options={enumList[dynamicVerifyFields.IMEIStatus ? 'brand' : 'iosBrand']} />
          </Form.Item>
          <Form.Item name={'deviceModel'} label="型号" rules={[{ required: true, message: '请输入型号' }]}>
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item name={'deviceSystem'} label="系统" rules={[{ required: true, message: '请选择系统' }]}>
            <Select placeholder="请选择" className={styles.w220} options={enumList[dynamicVerifyFields.IMEIStatus ? 'androidSystem' : 'iosSystem']} />
          </Form.Item>
          <Form.Item name={'deviceSystemVersion'} label="系统版本" rules={[{ required: true, message: '请输入系统版本' }]}>
            <Input />
          </Form.Item>
          <Form.Item name={'deviceLoginUser'} label="用户名">
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item name={'deviceLoginKey'} label="密码">
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item name={'deviceImei'} label="IMEI（安卓）" rules={[{ required: dynamicVerifyFields.IMEIStatus, message: '请输入IMEI' }]}>
            <Input placeholder='请输入' disabled={curQuery.type === 'detail' ? true : dynamicVerifyFields.deviceSerialNoStatus} />
          </Form.Item>
          <Form.Item name={'deviceSerialNo'} label="序列号（ios）" rules={[{ required: dynamicVerifyFields.deviceSerialNoStatus, message: '请输入序列号' }]}>
            <Input placeholder='请输入' disabled={curQuery.type === 'detail' ? true : dynamicVerifyFields.IMEIStatus} />
          </Form.Item>
          <Form.Item name={'deviceResolution'} label="分辨率" rules={[{ required: true, message: '请输入分辨率' }]}>
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item name={'deviceSize'} label="尺寸" rules={[{ required: true, message: '请输入尺寸' }]}>
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item name={'deviceColor'} label="颜色" rules={[{ required: true, message: '请输入颜色' }]}>
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item name={'deviceAccessory'} label="配件">
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item name={'deviceRemark'} label="备注">
            <TextArea placeholder='请输入' />
          </Form.Item>
          {
            curQuery.type !== 'add' && <Form.Item name={'deviceCharge'} label="负责人">
              <Input placeholder='请输入' />
            </Form.Item>
          }
          {
            curQuery.type !== 'add' && <Form.Item name={'deviceChargeAcct'} label="负责人账号">
              <Input placeholder='请输入' />
            </Form.Item>
          }
          {
            curQuery.type !== 'add' && <Form.Item name={'expireDate'} label="申请到期日">
              <DatePicker format={'YYYY-MM-DD'} />
            </Form.Item>
          }
          {
            curQuery.type === 'detail' && <Form.Item name={'createdTime'} label="创建时间">
              <DatePicker showTime format={'YYYY-MM-DD HH:mm:ss'} />
            </Form.Item>
          }
          {
            curQuery.type === 'detail' && <Form.Item name={'updatedTime'} label="更新时间">
              <DatePicker showTime format={'YYYY-MM-DD HH:mm:ss'} />
            </Form.Item>
          }
        </Form>
      </Spin>
      <div className={styles.operator}>
        <Button type="primary" onClick={() => { history.push('/phone/device') }} >返回</Button>
        {
          curQuery.type !== 'detail' && <Button type="primary" loading={loadings} onClick={() => { updateDevice() }} >提交</Button>
        }
      </div>
      {contextHolder}
    </div >
  )
}
export default ContrastAdd