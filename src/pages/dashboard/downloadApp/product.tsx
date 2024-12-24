/*
 * @Author: waghao10
 * @Date: 2024-09-14 13:42:22
 * @Description: 生产环境app
 */
import { Table, Image } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import QRCode from 'qrcode'
import { getName } from '../utils'

const Product = (props: any) => {
  const { initData, enumList } = props
  const [dataSource, setDataSource] = useState([])
  const columns = useMemo(() => {
    return [
      {
        title: '机型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
        render: (_: any, record: any) => {
          return (
            <span>{getName(record.type, enumList?.deviceType || [])} </span >
          )
        }
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
  }, [enumList])

  /**
   * @description: 处理dataSource
   * @return {*}
   */
  const handleDataSource = () => {
    const _newData: any = []
    initData.forEach(async (v: any) => {
      const _urlCode = await QRCode.toDataURL(v?.downloadUrl || '')
      const obj = {
        ...v,
        url: _urlCode
      }
      _newData.push(obj)
    })
    setDataSource(_newData)
  }
  useEffect(() => {
    if (initData) {
      handleDataSource()
    }
  }, [initData])
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
    />
  )
}

export default Product