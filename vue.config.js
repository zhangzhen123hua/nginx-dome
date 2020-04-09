module.exports = {
  devServer: {
    proxy:{
      '/interface/': {
        // target: 'http://192.168.1.95:9008',
        // target: 'http://192.168.0.243:9001',
        target: 'http://192.168.1.102:9001',
        changeOrigin: true
      }
    }
  }
}