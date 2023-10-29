export default function myAdapter(config: any) {
  return new Promise((resolve, reject) => {
    const settle = require('axios/lib/core/settle')
    const buildURL = require('axios/lib/helpers/buildURL')
    const baseURL = config.baseURL ? config.baseURL : ''
    uni.request({
      method: config.method.toUpperCase(),
      url: baseURL + buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        settle(resolve, reject, response)
      }
    })
  })
}
