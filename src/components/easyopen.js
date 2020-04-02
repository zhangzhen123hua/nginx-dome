const dayjs = require('dayjs')
const md5 = require('md5')
const axios = require('axios')

const DEFAULT_CONFIG = {
  baseUrl: '',
  method: 'POST',
  timeout: 60000,
  format: 'json',
  version: '',
  app_key: 'test',
  secret: '123456'
}

export default class EasyOpen {
  constructor (config) {
    this.config = {}
    Object.assign(this.config, DEFAULT_CONFIG)
    Object.assign(this.config, config)

    this.axios = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
    })

    this.fetch = (name, payload) => {
      let postData = this.buildPostData(name, payload)
      return this.axios({
        method: this.config.method,
        data: postData
      })
    }
  }

  buildPostData (name, payload = {}) {
    // eslint-disable-next-line
    let { app_key, version, secret } = this.config
    payload = {
      app_key,
      version,
      name,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      data: encodeURIComponent(JSON.stringify(payload))
    }

    // 生成签名
    let paramNameValue = []
    let paramNames = Object.keys(payload).sort()
    paramNames.forEach(name => {
      paramNameValue.push(name)
      paramNameValue.push(payload[name])
    })
    let signSource = secret + paramNameValue.join('') + secret
    let sign = md5(signSource).toUpperCase()

    return { sign, ...payload }
  }
}

export const instance = new EasyOpen({
  baseUrl: '/interface/apidata',
  app_key: 'test',
  secret: '123456',
  version:'1.0'
})

// 由于page组件根据之前后端惯用返回值字段封装 为了适配种接口返回格式 做了格式转换
export const pageParse = (url, cb) => {
  return async ({ currentPage, pageSize, ...other }) => {
    currentPage = currentPage - 1
    let { data } = await instance.fetch(url, {
      begin: currentPage * pageSize,
      limit: pageSize,
      ...other
    })
    let { totalCount: totalElements, items: content } = data.data
    let result = { totalElements, content, page: currentPage + 1 }
    return cb ? cb(result) : result
  }
}
