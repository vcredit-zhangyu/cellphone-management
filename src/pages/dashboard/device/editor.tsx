/*
 * @Author: waghao10
 * @Date: 2024-09-26 10:34:51
 * @Description: 富文本编辑
 */
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import uploadImg from '@/services/api/upload'
const MyEditor = forwardRef((props: any, ref) => {
  const { defaultHtml, updateHtml } = props
  const [editor, setEditor]: any = useState(null) // 存储 editor 实例
  console.log('======default===', defaultHtml)
  const [html, setHtml] = useState(defaultHtml) // 编辑器内容

  useEffect(() => {
    updateHtml(html)
  }, [html])


  useImperativeHandle(ref, () => ({
    resetHtml: () => {
      setHtml('')
    }
  }))

  const toolbarConfig = {}
  const editorConfig: any = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        // form-data fieldName ，默认值 'wangeditor-uploaded-image'
        fieldName: 'your-custom-name',
        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 10 * 1024 * 1024, // 1M
        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 200,
        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ['image/*'],
        // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
        meta: {},
        // 将 meta 拼接到 url 参数中，默认 false
        metaWithUrl: false,
        // 自定义增加 http  header
        headers: {},
        // 跨域是否传递 cookie ，默认为 false
        withCredentials: true,
        // 超时时间，默认为 10 秒
        timeout: 5 * 1000, // 5 秒
        async customUpload(file: any, insertFn: any) {
          const url = await uploadImg(file)
          insertFn(url, '', '')
        },
      }
    }
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor === null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100, height: '100%', padding: '1vh 0', }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ minHeight: '500px', 'overflowY': 'hidden' }}
        />
      </div>
    </>
  )
})

export default MyEditor