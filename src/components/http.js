import { instance } from './easyopen.js'

//获取服务接口
export const serviceByLevel = () => { 
  return instance.fetch('findBaseServiceByPage.callback')
}
//获取模块接口
export const ModelByLevel = (data) => { 
  return instance.fetch('findAllServiceFunction.callback',data)
}
//获取表单接口
export const formByLevel = (data) => { 
  return instance.fetch('findBasePropertyByPage.callback',data)
}
//表单提交接口
export const formSubmitByLevel = (res,data) => { 
  return instance.fetch(res,data)
}
