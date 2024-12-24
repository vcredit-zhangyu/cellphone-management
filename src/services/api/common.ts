/*
 * @Author: waghao10
 * @Date: 2023-02-21 14:05:49
 * @Description: 通用接口
 */
import request from '../http';

/**
 * @description: 获取当前登录用户信息
 * @return {*}
 */
export function GetUserInfo() {
  return request.get(
    '/vzy/user'
  );
}

/**
 * @description: 退出登录
 * @return {*}
 */
export function logOut() {
  return request.get(
    '/vzy/logout'
  );
}

/**
 * @description: 设备列表
 * @return {*}
 */
export function getDeviceList(params: any) {
  return request.get(
    '/vzy/device/info/pageQuery',
    {
      params: { ...params }
    }
  );
}

/**
 * @description: 设备详情
 * @return {*}
 */
export function getDeviceDetail(params: any) {
  return request.get(
    '/vzy/device/info/detail',
    {
      params: { ...params }
    }
  );
}


/**
 * @description: 新增设备
 * @param {any} params
 * @return {*}
 */
export function addDevice(params: any) {
  return request.post(
    '/vzy/device/info/commit',
    {
      ...params
    }
  )
}

/**
 * @description: 设备状态变更--废弃
 * @return {*}
 */
export function deviceStatusUpdate(params: any) {
  return request.post(
    '/vzy/device/status/update',
    {
      ...params
    }
  );
}

/**
 * @description: 设备申请提交--借用、归还
 * @return {*}
 */
export function deviceApply(params: any) {
  return request.post(
    '/vzy/device/apply/commit',
    {
      ...params
    }
  );
}


/**
 * @description: 设备信息变更
 * @return {*}
 */
export function deviceUpdate(params: any) {
  return request.post(
    '/vzy/device/info/update',
    {
      ...params
    }
  );
}

/**
 * @description: 设备申请记录列表
 * @return {*}
 */
export function deviceApplyList(params: any) {
  return request.get(
    '/vzy/device/apply/pageQuery',
    {
      params: { ...params }
    }
  );
}

/**
 * @description: 设备申请记录详情
 * @return {*}
 */
export function getApplyInfo(params: any) {
  return request.get(
    '/vzy/device/apply/detail',
    {
      params: { ...params }
    }
  );
}

/**
 * @description: 设备申请审核
 * @return {*}
 */
export function deviceApprove(params: any) {
  return request.post(
    '/vzy/device/apply/approve',
    {
      ...params
    }
  );
}

/**
 * @description: 设备变更记录列表
 * @return {*}
 */
export function deviceUpdateLog(params: any) {
  return request.get(
    '/vzy/device/log/pageQuery',
    {
      params: { ...params }
    }
  );
}

/**
 * @description: 设备使用记录列表
 * @return {*}
 */
export function deviceUseLog(params: any) {
  return request.get(
    '/vzy/device/app/pageQuery',
    {
      params: { ...params }
    }
  );
}

/**
 * @description: 枚举获取
 * @return {*}
 */
export function getEnums() {
  return request.get(
    '/vzy/device/enums/query',
  );
}


/**
 * @description: 版本管理分页查询
 * @return {*}
 */
export function getVerisonList(params: any) {
  return request.get(
    '/vzy/app/version/pageQuery',
    {
      params: { ...params }
    }
  );
}

/**
 * @description: 版本详情
 * @return {*}
 */
export function getVersionDetail(params: any) {
  return request.get(
    `/vzy/app/version/queryByVersionId`,
    {
      params: { ...params }
    }
  );
}

/**
 * @description: 版本新增
 * @param {any} params
 * @return {*}
 */
export function addVersion(params: any) {
  return request.post(
    '/vzy/app/version/commit',
    {
      ...params
    }
  )
}

/**
 * @description: 版本修改
 * @param {any} params
 * @return {*}
 */
export function updateVersion(params: any) {
  return request.post(
    '/vzy/app/version/update',
    {
      ...params
    }
  )
}


/******************意见反馈********************** */

/**
 * @description: 反馈列表
 * @param {any} params
 * @return {*}
 */
export function feedBackList(params: any) {
  return request.post(
    '/vzy/device/feedback/query',
    {
      ...params
    }
  );
}

/**
 * @description: 提交反馈意见
 * @param {any} params
 * @return {*}
 */
export function feedCommit(params: any) {
  return request.post(
    '/vzy/device/feedback/commit',
    {
      ...params
    }
  );
}


/******************机型分布**************************** */
/**
 * @description: 提交反馈意见
 * @param {any} params
 * @return {*}
 */
export function deviceReport(params: any) {
  return request.get(
    '/vzy/device/report',
  );
}


/******************申请说明**************************** */
/**
 * @description: 详情
 * @return {*}
 */
export function explainDetail() {
  return request.get(
    `/vzy/device/apply/explain`,
    {}
  );
}

/**
 * @description: 申请说明更新
 * @param {any} params
 * @return {*}
 */
export function explainEdit(params: any) {
  return request.post(
    '/vzy/device/apply/explain/commit',
    {
      ...params
    }
  );
}


/************************下载***************************** */
/**
 * @description: 模版
 * @return {*}
 */
export function downloadTemplate() {
  return request.get(
    `/vzy/device/download`,
    {
      responseType: 'blob',
    },
  );
}

/**
 * @description: 导入
 * @param {any} params
 * @return {*}
 */
export function importTemplate(params: any) {
  return request({
    url: '/vzy/device/import',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/************************下载版本查询***************************** */
/**
 * @description: 查询
 * @return {*}
 */
export function appDownload(params: any) {
  return request.post(
    `/vzy/device/app/download/query`,
    {
      ...params
    }
  );
}
  /***********************日活用户量查询***************************** */
/**
 * @description: 查询
 * @return {*}
 */
export function daylivesearch(params: any) {
  return request.get(
    `/vzy/device/active/query`,
    {
      params: { ...params }
    }
  );
}
