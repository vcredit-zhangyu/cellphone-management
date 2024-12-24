import { daylivesearch } from '@/services/api/common'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, DatePicker, Form, Row, Space, Spin, Table, TableColumnsType } from 'antd'
import { useState } from 'react'
import styles from './index.module.less'
interface DataType {
  system: string
  userCount: string
  dayLive: string
}
const deviceUsersNum = () => {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const [loading, setLoading] = useState(false)
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  const [tableList, setTableList] = useState([])

  const columns: TableColumnsType<DataType> = [
    {
      title: '系统',
      dataIndex: 'systemName',
      key: 'systemName',
      // width: '20%',
    },
    {
      title: '用户量（个数）',
      dataIndex: 'totalUserCount',
      // width: '20%',
      sorter: {
        compare: (a, b) => a.totalUserCount - b.totalUserCount,
        multiple: 3,
      },
    },
    {
      title: '活跃量（个数）',
      dataIndex: 'activeUserCount',
      // width: '20%',
      sorter: {
        compare: (a, b) => a.activeUserCount - b.activeUserCount,
        multiple: 2,
      },
    },
  ]
  const onSearch = () => {
    setLoading(true)
    daylivesearch({
      startDay: startTime,
      endDay: endTime,
    }).then((res) => {
      setLoading(false)
      // console.log(res, 'res---789')
      setTableList(res?.data)
    })
  }
  return (
    <div className={styles.main}>
      <Card title="" bordered={true}>
        <Form form={form} name="usetime" className={styles.search}>
          <Row gutter={16}>
            <Form.Item name="" label="日期">
              <RangePicker
                onChange={(value, dateString) => {
                  console.log('Selected Time: ', value)
                  console.log('Formatted Selected Time: ', dateString)
                  setStartTime(dateString[0])
                  setEndTime(dateString[1])
                }}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    onSearch()
                  }}
                  icon={<SearchOutlined />}
                >
                  查找
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
            // scroll={{ x: 1200 }}
            dataSource={tableList}
            rowClassName="editable-row"
            rowKey={(rowData) => rowData.deviceNo}
          />
        </Spin>
      </Card>
    </div>
  )
}
export default deviceUsersNum
