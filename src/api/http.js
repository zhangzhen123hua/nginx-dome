import { instance } from './easyopen.js'
//获取模块接口
export const ModelByLevel = (data) => { 
  return instance.fetch('findAllServiceFunction.callback',data)
}


