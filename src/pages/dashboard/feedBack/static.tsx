/*
 * @Author: waghao10
 * @Date: 2024-09-14 10:52:03
 * @Description: 意见反馈按钮控制
 */
const btnPermisson: any = {
  '待处理': [
    { key: '1', label: '处理中' },
    { key: '2', label: '已处理' },
    { key: '3', label: '不予处理' },
  ],
  '处理中': [
    { key: '2', label: '已处理' },
    { key: '3', label: '不予处理' },
  ],
  '已处理': [],
  '不予处理': []
}

export {
  btnPermisson
}