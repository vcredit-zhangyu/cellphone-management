/*
 * @Author: wanghao10
 * @Date: 2022-11-10 17:35:21
 * @Description: 拦截器配置
 */
import { getCookie } from '@/common/utils'
import { message } from 'antd'
import axios from 'axios'

import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const service = axios.create({
  timeout: 1000 * 60 * 60,
  withCredentials: false,
})

const msgTxt = (data: { code: number; msg: string }) => {
  if (data) {
    try {
      return data?.msg && JSON.parse(data?.msg)?.message
    } catch (err) {
      if (data?.msg) {
        return data?.msg
      } else {
        return '接口异常'
      }
    }
  }
}

// 请求头添加token
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let token
    if (/localhost/gi.test(window.location.href)) {
      token = ''
    } else {
      token = getCookie('Vzy-Website-Token')
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      config.headers.token = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res?.status && res?.status === 200) {
      // 接口业务错误信息拦截
      if (res?.data?.code === -1) {
        message.error(res?.data?.msg)
        return Promise.reject(res)
      } else {
        return Promise.resolve(res.data)
      }
    } else {
      const data = res.data || {}
      const msg = data.msg || data.message
      // message.error(msg || '操作失败');
      return Promise.reject(res)
    }
  },
  (error: AxiosError<any>) => {
    if (error.response) {
      let { message } = error.response.data
      switch (error.response.status) {
        case 401: {
          // 401 清除token信息并跳转到登录页面
          console.log('start redirect ..')
          const url = error.response.headers.location
          console.log(error.response)

          if (url.includes('/oauth/authorize')) {
            window.location.href = `${url}`
          }
          break
        }
        case 403: {
          // 403 没权限，不允许访问
          if (!message) {
            message = '不允许访问'
          }
          message({
            title: error.response.status,
            message,
            type: 'error',
          })
          break
        }
        default: {
          if (!message) {
            message = error.response.data
          }
          break
        }
      }
    }
    return Promise.reject(error)
  },
)

export default service
