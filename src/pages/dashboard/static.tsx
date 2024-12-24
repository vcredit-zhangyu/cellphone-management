/*
 * @Author: waghao10
 * @Date: 2024-04-16 15:56:47
 * @Description: 静态配置
 */
// 机型
const MACHINE_TYPE = [
  {
    value: '安卓',
    label: '安卓'
  },
  {
    value: '苹果',
    label: '苹果'
  }
]

// 设备状态
const DEVICE_STATUS = [
  {
    value: '未采购',
    label: '未采购'
  },
  {
    value: '待申请',
    label: '待申请'
  },
  {
    value: '申请中',
    label: '申请中'
  },
  {
    value: '使用中',
    label: '使用中'
  },
  {
    value: '故障',
    label: '故障'
  },
  {
    value: '已回收',
    label: '已回收'
  }
]

// 申请状态
const APPLY_STATUS = [
  {
    value: '待审核',
    label: '待审核'
  },
  {
    value: '审核通过',
    label: '审核通过'
  },
  {
    value: '审核拒绝',
    label: '审核拒绝'
  }
]

// 申请类型
const APPLY_TYPE = [
  {
    value: '借用',
    label: '借用'
  },
  {
    value: '归还',
    label: '归还'
  }
]


// 操作者
const OPERATOR_ENUM = [
  {
    value: '管理员',
    label: '管理员'
  },
  {
    value: '系统',
    label: '系统'
  },
  {
    value: 'app',
    label: 'app'
  }
]

// App
const APP_TYPE = [
  {
    value: '豆豆钱',
    label: '豆豆钱'
  },
  {
    value: '卡卡贷',
    label: '卡卡贷'
  },
  {
    value: '闪贷',
    label: '闪贷'
  },
  {
    value: '豆乐购',
    label: '豆乐购'
  }
]
export {
  MACHINE_TYPE,
  DEVICE_STATUS,
  APPLY_STATUS,
  APPLY_TYPE,
  OPERATOR_ENUM,
  APP_TYPE,
}