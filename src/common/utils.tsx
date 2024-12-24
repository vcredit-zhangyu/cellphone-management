/*
 * @Author: waghao10
 * @Date: 2023-02-09 15:23:46
 * @Description: 公共方法
 */

import { message } from "antd";

/**
 * @description: 加载本地图片 
 * @param {string} url
 * @param {number} type
 * @return {*}
 */
function getImg(url: string, type: number) {
  let img;
  try {
    switch (type) {
      case 0:
        img = require(`@/assets/images/${url}`)
        break;
      default:
        break
    }
  } catch (err) {
    // TODO：图片不存在加载默认图片，默认图片待确定
    img = ''
  }
  return img
}

function getCookie(cookie_name: string) {
  const allcookies = document.cookie;
  //索引长度，开始索引的位置
  let cookie_pos = allcookies.indexOf(cookie_name);
  let value
  // 如果找到了索引，就代表cookie存在,否则不存在
  if (cookie_pos != -1) {
    // 把cookie_pos放在值的开始，只要给值加1即可
    //计算取cookie值得开始索引，加的1为“=”
    cookie_pos = cookie_pos + cookie_name.length + 1;
    //计算取cookie值得结束索引
    let cookie_end = allcookies.indexOf(';', cookie_pos);

    if (cookie_end == -1) {
      cookie_end = allcookies.length;

    }
    //得到想要的cookie的值
    value = unescape(allcookies.substring(cookie_pos, cookie_end));
  }
  return value
}

/**
 * @description: query处理
 * @param {string} search
 * @return {*}
 */
function getQueryPrams(search: string = location.search) {
  if (search) {
    const str = (search || '').replace('?', '');
    const query: { [key: string]: unknown } = {};
    str.split('&').map((item: string) => {
      const [key, value] = item.split('=');
      query[key] = value;
      return item;
    });
    return query;
  } else {
    return {}
  }
}

/**
 * @description: 导出excel文件
 * @param {*} ecmUuid
 * @param {*} fileName
 * @return {*}
 */

function exportFile(data: any, name: string) {
  if (data) {
    const link = document.createElement('a');
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
    });
    link.style.display = 'none';
    const blobUrl = window.URL.createObjectURL(blob);
    link.setAttribute('download', name);
    link.href = blobUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } else {
    message.error('下载失败,请重试');
  }
}


const myStorage: any = {
  //存储
  set(key: any, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  //取出数据
  get(key: any) {
    try {
      const value = window.localStorage.getItem(key);
      if (value === null || value === undefined || value === "") {
        return null;
      }
      return JSON.parse(value);
    } catch (err) {
      return null
    }
  },
  // 删除数据
  remove(key: any) {
    window.localStorage.removeItem(key);
  }
}


function flatRoutes(data: any, ary: any) {
  let newary = ary
  for (let i = 0; i < data.length; i++) {
    newary.push({
      ...data[i]
    })
    if (!data[i].routes) {
      // code
    } else {
      flatRoutes(data[i].routes, newary);
    }
  }
  return newary;
}

/**
 * @description: 获取token
 * @return {*}
 */
function getToken() {
  return getQueryPrams(window.location?.hash.split('?')[1])
}


function transTree(data: any) {
  let result;
  let map: any = {};
  data.forEach((item: any) => {
    map[item.id] = item;
  });
  data.forEach((item: any) => {
    let parent = map[item.parentId];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result = item;
    }
  });
  return result;
}

/**
 * @description: 获取年月日信息
 * @return {*}
 */
function getcurDate() {
  let date = new Date() // 获取时间
  let year = date.getFullYear() // 获取年
  let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1 // 获取月
  let strDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()  // 获取日
  return `${year}${month}${strDate}`
}

export {
  getImg,
  getQueryPrams,
  exportFile,
  myStorage,
  flatRoutes,
  getToken,
  transTree,
  getcurDate,
  getCookie
}