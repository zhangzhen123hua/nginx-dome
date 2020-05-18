module.exports = {
  devServer: {
    proxy:{   //配置拦截地址
      '/interface/': {
        target: 'http://192.168.1.102:9001',
        changeOrigin: true   //发送请求头中host会设置成target，默认：false
      }
    }
  }
}