const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',//项目部署后，项目中的静态资源的访问路径路径
  outputDir: 'dist',//生成的生产环境构建文件的目录
  assetsDir: 'static',//放置生成的静态资源目录
  indexPath: 'index.html',//指定生成的 index.html 的输出路径
  // 通过chainWebpack 配置开发环境和生产环境的打包设置
  productionSourceMap: false, // 不生产map包 设为false，既可以减少包大小，也可以加密源码
  chainWebpack: config => {
    // 引入压缩模块gzip
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    // 生产环境配置
    config.when(process.env.NODE_ENV === 'production', config => {
      {
        config.entry('app').clear().add('./src/pro.js')
        // 以下模块忽略打包到vendor中（vendor指的是第三方依赖库）
        config.set('externals', {
          // 左侧健名是引入包名字 右侧是使用插件的全局注册名字
          vue: 'Vue',
          'vue-router': 'VueRouter',
          axios: 'axios',
          vuex: "Vuex",
          xlsx: "XLSX",
          "element-ui": "ELEMENT",
          screenfull: "screenfull",
          wangeditor: "window.wangEditor",
          echarts: 'echarts',
          nprogress: 'NProgress',
          moment: "moment"
        })
        // gzip压缩
        config.plugin('CompressionPlugin').use(
          new CompressionWebpackPlugin({
            test: /\.(css|json|txt|html|ico|svg)(\?.*)?$/i,
            threshold: 10240, // 超过10kb的文件就压缩
            deleteOriginalAssets: true, // 不删除源文件 
            minRatio: 0.8 //指定压缩比例达到多少才会进行压缩
          })
        )
      }
    })
    // 开发环境设置
    config.when(process.env.NODE_ENV === 'development', config => {
      {
        config.entry('app').clear().add('./src/dev.js')
      }
    })
  }
})