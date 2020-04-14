module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        //"@":'src' 已默认配置这个别名
        'assets' : '@/assets',
        'common' : '@/common',
        'components' : '@/components',
        'network' : '@/network',
        'views' : '@/views'
      }
    }
  },
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      '/Test': {
        /* 目标代理服务器地址 */
        target: 'http://www.globletech.net/',
        /* 允许跨域 */
        changeOrigin: true,
      },
    },
  }
}
