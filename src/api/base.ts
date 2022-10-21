import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import type { ResponseData } from './types.d'

class Http {
  private axiosInstance: AxiosInstance
  constructor(options: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      timeout: 60 * 1000,
      ...options,
    })
    this.setupInterceptors()
  }

  /**
   * @描述 : 创建一个 axios 实例
   */
  createAxios(config: AxiosRequestConfig): void {
    this.axiosInstance = axios.create(config)
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  /**
   * @描述 : 重新设置请配置
   */
  configAxios(config: AxiosRequestConfig) {
    if (!this.axiosInstance)
      return

    this.createAxios(config)
  }

  /**
   *  @描述 ：设置通用请求头
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance)
      return

    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  /**
   * @描述 : 设置拦截配置
   */
  private setupInterceptors() {
    // request 拦截
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config
    }, undefined)
    // response 拦截
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<ResponseData<any>>) => {
      const { status, data } = res
      let err = ''
      if (status === 200) {
        if (data.status) {
          return Promise.resolve(res)
        }
        else {
          err = `Status False: ${data.message || 'NoMsg'}`
          return Promise.reject(new Error(err))
        }
      }
      else {
        err = `请求失败: ${data.message || 'NoMsg'}`
        return Promise.reject(new Error(err))
      }
    })
  }

  get<T = any, R = ResponseData<T>>(url: string, params?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.request({ ...config, url, method: 'GET', params })
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.request({ ...config, url, method: 'POST', data })
  }

  put<T = any>(url: string, data: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.request({ ...config, url, method: 'PUT', data })
  }

  delete<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.request({ ...config, url, method: 'delete', data })
  }

  request<T = any, R = ResponseData<T>>(config: AxiosRequestConfig): Promise<R> {
    const conf: AxiosRequestConfig = config
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<R>>(conf)
        .then((res: AxiosResponse<R>) => {
          resolve(res.data)
        })
        .catch((e: Error) => {
          // 为避免同时出现多条告警影响体验，这里使用 key 指定为单例模式，
          // 缺点是错误消息可能会变，后续考虑使用节流函数
          message.error({ content: e.message, key: 'ERROR_MSG' })
          reject(e)
        })
    })
  }
}

export const REQUEST = new Http({
  baseURL: (window as any).__ZJ_XXX__.apiUrlBase,
})
