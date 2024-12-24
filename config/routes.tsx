/*
 * @Author: waghao10
 * @Date: 2022-11-10 10:56:43
 * @Description: 路由配置项
 */
import { v4 as uuidv4 } from 'uuid'
const routes = [
  // TODO:后期如果可以计划迁移登录页
  {
    id: uuidv4(),
    path: '/',
    component: '@/pages/dashboard',
    exact: true,
    breadcrumb: '首页',
    wrappers: ['@/wrappers/auth'],
    routes: [
      {
        id: 'phone_index',
        path: '/phone',
        breadcrumb: '手机管理系统',
        levelName: 'phone',
        exact: true,
        uniqueCode: 'PHONE_INDEX',
        icon: 'TabletOutlined',
        routes: [
          {
            id: 'phone_device',
            path: '/phone/device',
            breadcrumb: '设备申请',
            uniqueCode: 'DEVICE_MANAGE',
            type: 'phone',
            key: 'device',
            component: '@/pages/dashboard/device',
            exact: true,
          },
          {
            id: 'phone_devicesub',
            parent: {
              pathname: '/phone/device', // 父级路径
              title: '设备管理', // 面包屑
            },
            hideBar: true, // 菜单栏不展示
            path: '/phone/device/sub', // 路由
            breadcrumb: '', //三级路由设置空就行
            uniqueCode: 'DEVICE_SUB', // 菜单唯一key值
            type: 'phone', // 集合
            component: '@/pages/dashboard/device/sub', // 加载组件
            exact: true, // 精确匹配
            noVerify: true, // 二级页面不进行路由校验
          },
          {
            id: 'phone_apply',
            path: '/phone/apply',
            exact: true,
            breadcrumb: '申请记录',
            type: 'phone',
            key: 'apply',
            component: '@/pages/dashboard/apply',
            uniqueCode: 'APPLY_LOG',
            icon: 'mange_icon.png',
          },
          {
            id: 'phone_applysub',
            path: '/phone/apply/sub',
            hideBar: true,
            parent: {
              pathname: '/phone/apply', // 父级路径
              title: '申请记录', // 面包屑
            },
            breadcrumb: '',
            type: 'phone',
            component: '@/pages/dashboard/apply/sub',
            uniqueCode: 'APPLY_LOG_SUB',
            exact: true, // 精确匹配
            noVerify: true, // 二级页面不进行路由校验
          },
          {
            id: 'phone_update',
            path: '/phone/update',
            exact: true,
            breadcrumb: '设备变更记录',
            type: 'phone',
            key: 'update',
            component: '@/pages/dashboard/update',
            uniqueCode: 'DEVICE_UPDATE',
            icon: 'mange_icon.png',
          },
          {
            id: 'phone_use',
            path: '/phone/use',
            exact: true,
            breadcrumb: '设备使用记录',
            type: 'phone',
            key: 'use',
            component: '@/pages/dashboard/use',
            uniqueCode: 'DEVICE_USE',
            icon: 'mange_icon.png',
          },
          {
            id: 'phone_version',
            path: '/phone/version',
            exact: true,
            breadcrumb: 'app版本管理',
            type: 'phone',
            key: 'version',
            component: '@/pages/dashboard/version',
            uniqueCode: 'DEVICE_VERSION',
            icon: 'mange_icon.png',
          },
          {
            id: 'phone_versionsub',
            path: '/phone/version/sub',
            hideBar: true,
            parent: {
              pathname: '/phone/version', // 父级路径
              title: 'app版本管理', // 面包屑
            },
            breadcrumb: '',
            type: 'phone',
            component: '@/pages/dashboard/version/sub',
            exact: true, // 精确匹配
            noVerify: true, // 二级页面不进行路由校验
          },
          {
            id: 'phone_feedBack',
            path: '/phone/feedBack',
            exact: true,
            breadcrumb: '意见反馈',
            type: 'phone',
            key: 'feedBack',
            component: '@/pages/dashboard/feedBack',
            uniqueCode: 'DEVICE_FEEDBACK',
            icon: 'mange_icon.png',
          },
          {
            id: 'phone_downloadApp',
            path: '/phone/downloadApp',
            exact: true,
            breadcrumb: '掌御app下载',
            type: 'phone',
            key: 'downloadApp',
            component: '@/pages/dashboard/downloadApp',
            uniqueCode: 'DEVICE_DOWNLOADAPP',
            icon: 'mange_icon.png',
          },
          // {
          //   id: 'phone_modelDistribute',
          //   path: '/phone/modelDistribute',
          //   exact: true,
          //   breadcrumb: '测试手机机型分布',
          //   type: 'phone',
          //   key: 'modelDistribute',
          //   component: '@/pages/dashboard/modelDistribute',
          //   uniqueCode: 'DEVICE_MODELDISTRIBUTE',
          //   icon: 'mange_icon.png',
          // },
          {
            id: 'phone_deviceUsersNum',
            path: '/phone/deviceUsersNum',
            exact: true,
            breadcrumb: '用户统计',
            type: 'phone',
            key: 'deviceUsersNum',
            component: '@/pages/dashboard/deviceUsersNum',
            uniqueCode: 'DEVICE_DEVICEUSERSNUM',
            icon: 'mange_icon.png',
          },
          {
            path: '*',
            component: '@/pages/404',
            exact: true,
            noVerify: true,
          },
        ],
      },
      {
        id: uuidv4(),
        path: '/error',
        breadcrumb: '',
        uniqueCode: 'NO_PERMISSION',
        type: '',
        key: '',
        component: '@/pages/nopermission',
        exact: true,
      },
    ],
  },
  {
    path: '*',
    component: '@/pages/404',
    exact: true,
    noVerify: true,
  },
]

export default routes
