/*
 * @Author: waghao10
 * @Date: 2024-04-07 15:27:38
 * @Description: 静态配置
 */

/**
 * @description: 按钮权限配置
 * @return {*}
 */
const btnPermission: any = {
  // 待申请
  wait_apply: [
    {
      key: 'detail',
      label: '详情',
      vzy_admin: 1,
      vzy_normal: 1,
      pic: 1,
    },
    {
      key: 'update',
      label: '更新',
      vzy_admin: 1,
      vzy_normal: 0,
      pic: 1,
    },
    {
      key: 'apply',
      label: '申请',
      vzy_admin: 1,
      vzy_normal: 1,
      pic: 1,
    },
    {
      key: 'abandon',
      label: '废弃',
      vzy_admin: 1,
      vzy_normal: 0,
      pic: 1,
    }
  ],
  // 申请中
  applying: [
    {
      key: 'detail',
      label: '详情',
      vzy_admin: 1,
      vzy_normal: 1,
      pic: 1,
    },
    {
      key: 'update',
      label: '更新',
      vzy_admin: 1,
      vzy_normal: 0,
      pic: 1,
    },
  ],
  // 使用中
  using: [
    {
      key: 'detail',
      label: '详情',
      vzy_admin: 1,
      vzy_normal: 1,
      pic: 1,
    },
    {
      key: 'update',
      label: '更新',
      vzy_admin: 1,
      vzy_normal: 0,
      pic: 0,
    },
    {
      key: 'back',
      label: '归还',
      vzy_admin: 0,
      vzy_normal: 0,
      pic: 1,
    }
  ],
  // 待归还
  wait_return: [
    {
      key: 'detail',
      label: '详情',
      vzy_admin: 1,
      vzy_normal: 1,
      pic: 1,
      approver: 0
    },
    {
      key: 'update',
      label: '更新',
      vzy_admin: 1,
      vzy_normal: 0,
      pic: 0,
    },
    {
      key: 'back',
      label: '归还',
      vzy_admin: 0,
      vzy_normal: 0,
      pic: 1,
    },
    {
      key: 'delayAudit',
      label: '延期申请',
      vzy_admin: 0,
      vzy_normal: 0,
      pic: 1,
    }
  ],
  // 故障
  fault: [
    {
      key: 'detail',
      label: '详情',
      vzy_admin: 1,
      vzy_normal: 1,
      pic: 1,
    },
    {
      key: 'update',
      label: '更新',
      vzy_admin: 1,
      vzy_normal: 0,
      pic: 1,
    },
    {
      key: 'abandon',
      label: '废弃',
      vzy_admin: 1,
      vzy_normal: 0,
      pic: 1,
    }
  ],
  // 已废弃
  abandoned: [
    {
      key: 'detail',
      label: '详情',
      vzy_admin: 1,
      vzy_normal: 1,
      pic: 1,
    },
  ]
}

const systemConfig = {
  
}
// [{ value: 'Android', label: 'Android' }, { value: 'harmonyos', label: 'harmonyos' }, { value: 'iOS', label: 'iOS' }]


export {
  btnPermission
}