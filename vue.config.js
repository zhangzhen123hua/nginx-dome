module.exports = {
  devServer: {
    proxy:{
      '/interface/': {
        target: 'http://192.168.1.95:9008',
        changeOrigin: true
      }
    }
  }
}