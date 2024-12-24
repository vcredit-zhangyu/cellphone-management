/*
 * @Author: waghao10
 * @Date: 2024-09-14 11:19:32
 * @Description: 批量上传modal
 */
import { Button, Modal, Upload, Form, Flex, Tag, message } from 'antd'
import { useState } from 'react'
import {
  UploadOutlined,
  VerticalAlignBottomOutlined,
  BookOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import styles from './index.module.less'
import { downloadTemplate, importTemplate } from '@/services/api/common'

interface batchInterface {
  openModal: boolean
  closeModal: () => void
  updateTable: () => void

}
const BatchModal = (props: batchInterface) => {
  const { openModal, closeModal, updateTable } = props
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [fileList, setFileList] = useState<any>([])

  /**
   * @description: 提交上传文件
   * @return {*}
   */
  const submit = () => {
    if (!fileList || fileList.length === 0) {
      message.error('请上传文件')
      return
    }

    setConfirmLoading(true)
    const formData = new FormData()
    formData.append('file', fileList[0]?.file)
    importTemplate(formData).then((res: any) => {
      if (res) {
        message.success('上传成功')
        setFileList([])
        setConfirmLoading(false)
        closeModal()
        updateTable()
      }
    })
  }

  /**
   * @description: 上传文件
   * @return {*}
   */
  const uploadFile = (file: any) => {
    setFileList([{
      file: file.file,
      name: file.file.name
    }])
  }

  /**
   * @description: 下载模版
   * @return {*}
   */
  const dTemplate = () => {
    downloadTemplate().then((res: any) => {
      if (res) {
        const blob = new Blob([res], { type: 'application/vnd.ms-excel;charset=utf-8' })
        const fileName = '设备批量上传模版.xlsx'
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      }
    })
  }



  return (
    <Modal title="批量上传" open={openModal} onOk={submit} onCancel={() => {
      setFileList([])
      closeModal()
    }} confirmLoading={confirmLoading}>
      <Form>
        <Form.Item label="文件上传" required>
          <Button icon={<VerticalAlignBottomOutlined />} onClick={() => {
            dTemplate()
          }} style={{ marginRight: 15 }}>模版下载</Button>
          <Upload action={''} customRequest={uploadFile} maxCount={1} showUploadList={false}>
            <Button icon={<UploadOutlined />}>批量导入</Button>
          </Upload>
          <Flex gap="4px 0" wrap className={styles.fileList}>
            {
              fileList && fileList.map((item: any) => {
                return (
                  <Tag key={item.name} icon={<BookOutlined />} color="blue" closeIcon={<DeleteOutlined />} onClose={() => {
                    setFileList([])
                  }}>{item.name}</Tag>
                )
              })
            }

          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default BatchModal