const dayjs = require('dayjs')
const md5 = require('md5')
const axios = require('axios')

const DEFAULT_CONFIG = {
  baseUrl: '/interface/apidata',
  method: 'POST',
  timeout: 60000,
  format: 'json',
  app_key: 'test',
  secret: '123456',
  version:'1.0'
}

export default class EasyOpen {
  constructor() {
    //为实例对象添加属性
    this.config = {}
    Object.assign(this.config, DEFAULT_CONFIG)
    
    //自定义新建一个 axios 实例
    this.axios = axios.create({  
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
    })
   
    this.fetch = (name, payload) => {
      //将密文和明文一发送到后端。
      let postData = this.buildPostData(name, payload)
      console.log(postData)
      return this.axios({
        method: this.config.method,
        data: postData
      })
    }
  }
 //原型中的方法
  buildPostData (name, payload = {}) {
    let { app_key, version, secret } = this.config
    //加密的字段
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
    console.log(paramNames)
    paramNames.forEach(name => {
      paramNameValue.push(name)
      paramNameValue.push(payload[name])
    })
    console.log(paramNameValue)
    let signSource = secret + paramNameValue.join('') + secret
    let sign = md5(signSource).toUpperCase()
    console.log(sign,payload)

    return { sign, ...payload }
  }
}

export const instance = new EasyOpen()


