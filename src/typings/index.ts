/*
 * @Author: waghao10
 * @Date: 2023-02-20 10:39:33
 * @Description: 
 */
export interface DEMOINTERFACE {
  username: string
  permissionList: any
  dataPermissionList: any
  roleList: any
}

/**
 * @description: 设备列表字段
 * @return {*}
 */
export interface deviceListItemInterface {
  deviceId: string
  deviceNo: string
  deviceType: string
  deviceName: string
  deviceModel: string
  deviceSystem: string
  deviceSystemVersion: string
  deviceCharge: string
  deviceStatus: string
  expireDate: string
  deviceChargeAcct: string
}

/**
 * @description: 设备详情字段
 * @return {*}
 */
export interface deviceDetailInterface {
  deviceId: string
  deviceName: string
  deviceNo: string
  deviceType: string
  deviceBrand: string
  deviceModel: string
  deviceSystem: string
  deviceSystemVersion: string
  deviceLoginUser: string
  deviceLoginKey: string
  deviceImei: string
  deviceSerialNo: string
  deviceResolution: string
  deviceColor: string
  deviceSize: string
  deviceAccessory: string
  deviceRemark: string
  deviceCharge: string
  expireDate: string
}

/**
 * @description: 设备申请记录列表字段
 * @return {*}
 */
export interface deviceApplyLogItemInterface {
  applyId: string
  deviceId: string
  applyType: string
  applyStatus: string
  applyTime: string
  applyPerson: string
  approvePerson: string
  createdTime: string
  updatedTime: string
  approveReason: string
}

/**
 * @description: 设备变更记录列表字段
 * @return {*}
 */
export interface deviceUpdateLogItemInterface {
  deviceNo: string
  deviceName: string
  operPerson: string
  operDetail: string
  operTime: string
}


/**
 * @description: 设备使用记录列表字段
 * @return {*}
 */
export interface deviceUseLogItemInterface {
  deviceNo: string
  deviceType: string
  deviceName: string
  deviceSystem: string
  deviceSystemVersion: string
  app: string
  appTime: string
}

/**
 * @description: 版本列表字段
 * @return {*}
 */
export interface versionItemInterface {
  versionId: string
  appVersion: string
  versionRemark: string
  appPlatform: string
  createdTime: string
  updatedTime: string
}

export interface feedBackInteface {
  [key: string]: any
}