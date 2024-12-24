/*
 * @Author: waghao10
 * @Date: 2023-05-11 17:03:48
 * @Description: 意见反馈
 */
import { Button, Form, Input, Row, Space, Select, Card, Spin, Table, DatePicker, Typography } from 'antd'
import styles from './index.module.less'
import {
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { feedBackList, feedCommit } from '@/services/api/common'
import { feedBackInteface } from '@/typings'
import useCommonEnum from '@/hooks/getCommonEnums'
import moment from 'moment'
import { btnPermisson } from './static'
const Update = () => {
  const [form] = Form.useForm()
  const [dataSource, setDataSoure]: any = useState([])
  const [pageObj, setPageObj] = useState({ pageSize: 10, currentPage: 1, total: 0 })
  const [loading, setLoading] = useState(false)
  const { RangePicker } = DatePicker
  const { getEnumConfig, enumList } = useCommonEnum()



    /**
   * @description: 查找
   * @param {any} value
   * @return {*}
   */
    const onSearch = (value: any) => {
      setLoading(true)
      const _formData = form.getFieldsValue()
      if (_formData.dateTime) {
        _formData.feedbackStartTime = moment(new Date(_formData.dateTime[0])).format('YYYY-MM-DD')
        _formData.feedbackEndTime = moment(new Date(_formData.dateTime[1])).format('YYYY-MM-DD')
        delete _formData.dateTime
      }
      const params = {
        ...value,
        ..._formData,
      }
      delete params.total
      setDataSoure([])
      feedBackList({ ...params }).then((res: any) => {
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
   * @description: 表头
   * @return {*}
   */
  const columns: any = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      fixed: 'left',
      width: 170,
      render: (_: any, index: any, t: any) => {
        console.log(t, '==index==')
        return t + 1
      }

    },
    {
      title: '设备号',
      dataIndex: 'deviceNo',
      key: 'deviceNo',
      fixed: 'left',
      width: 170
    },
    {
      title: '反馈内容',
      dataIndex: 'content',
      key: 'content',
      width: 150,
    },
    {
      title: '反馈时间',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: '处理结果',
      dataIndex: 'handleResult',
      key: 'handleResult',
      width: 160,
    },
    {
      title: '操作',
      fixed: 'right',
      width: 120,
      render: (_: any, record: feedBackInteface) => {
        return (
          <span>
            {
              (btnPermisson[record.handleResult || ''] || []).map((v: any) => {
                return (
                  <Typography.Link key={v.key} onClick={() => {
                    setLoading(true)
                    feedCommit({
                      deviceNo: record.deviceNo,
                      handleResult: v.label || '',
                      id:record.id,
                    }).then((res) => {
                      setPageObj({ pageSize: 10, currentPage: 1, total: 0 })
                      onSearch({ pageSize: 10, currentPage: 1 })
                      setLoading(false)
                    }).catch(()=>{
                      setLoading(false)
                    })
                  }} style={{ marginRight: 8 }}>
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
    onSearch({ currentPage: 1, pageSize: 10 })
  }

  useEffect(() => {
    // 枚举
    getEnumConfig()
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
              name="handleReuslt"
              label="处理结果"
            >
              <Select placeholder="请选择" className={styles.w220} options={enumList.current?.handleResults} />
            </Form.Item>
            <Form.Item
              name="dateTime"
              label="反馈时间"
            >
              <RangePicker />
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