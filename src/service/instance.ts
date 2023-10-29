// import axios from 'axios'
// // import mpAdapter from 'axios-miniprogram-adapter'
// import type { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
// import {
//   handleAxiosError,
//   handleBackendError,
//   handleResponseError,
//   handleServiceResult,
//   transformRequestData
// } from '@/utils/service'
// import { getStorage } from '@/utils/storage'
// import { REFRESH_TOKEN_CODE } from '@/common/service'
// import { handleRefreshToken } from './helpers'
// import myAdapter from './adapter'

// export default class CustomAxiosInstance {
//   instance: AxiosInstance

//   backendConfig: Service.BackendResultConfig

//   constructor(
//     axiosConfig: AxiosRequestConfig,
//     backendConfig: Service.BackendResultConfig = {
//       codeKey: 'Code',
//       dataKey: 'ReturnData',
//       msgKey: 'Message',
//       successCode: 1,
//       errorCode: -1
//     }
//   ) {
//     this.instance = axios.create({ ...axiosConfig, adapter: myAdapter as any })
//     this.backendConfig = backendConfig
//     this.setInterceptor()
//   }

//   setInterceptor() {
//     this.instance.interceptors.request.use(
//       async (config) => {
//         const handleConfig = { ...config }
//         if (handleConfig.headers) {
//           // 数据转换
//           const contentType = handleConfig.headers['Content-Type'] as UnionKey.ContentType
//           handleConfig.data = await transformRequestData(handleConfig.data, contentType)
//           // 设置token
//           const res = await getStorage('token')
//           if (res) {
//             handleConfig.headers.user_token = res || ''
//           }
//         }
//         return handleConfig
//       },
//       (axiosError: AxiosError) => {
//         const error = handleAxiosError(axiosError)
//         return handleServiceResult(error, null)
//       }
//     )
//     this.instance.interceptors.response.use(
//       (async (response) => {
//         const { status } = response
//         if (status === 200 || status < 300 || status === 304) {
//           const backend = response.data
//           const { codeKey, msgKey, dataKey, successCode, errorCode } = this.backendConfig
//           // 文件等不包含 codeKey 的响应格式
//           if (!backend[codeKey]) return handleServiceResult(null, backend)
//           // 请求成功
//           if (backend[codeKey] === successCode) {
//             return handleServiceResult(null, backend[dataKey])
//           }
//           if (backend[codeKey] === errorCode) {
//             console.error(backend[msgKey])
//           }

//           // token失效, 刷新token
//           if (REFRESH_TOKEN_CODE.includes(backend[codeKey])) {
//             const config = await handleRefreshToken(response.config)
//             if (config) {
//               return this.instance.request(config)
//             }
//           }

//           const error = handleBackendError(backend, this.backendConfig)
//           return handleServiceResult(error, null)
//         }
//         const error = handleResponseError(response)
//         return handleServiceResult(error, null)
//       }) as (response: AxiosResponse<any, any>) => Promise<AxiosResponse<any, any>>,
//       (axiosError: AxiosError) => {
//         const error = handleAxiosError(axiosError)
//         return handleServiceResult(error, null)
//       }
//     )
//   }
// }
