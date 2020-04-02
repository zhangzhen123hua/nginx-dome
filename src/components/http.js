import { instance } from './easyopen.js'
export const fromByLevel = (res,data) => {
  return instance.fetch(res,data)
}