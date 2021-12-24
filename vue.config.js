module.exports = {
  productionSourceMap: process.env.NODE_ENV !== 'production', // 生产打包时不输出map文件，增加打包速度
  // px2rem-loader 这个插件转换不了vant，切换成了postcss-pxtorem
  // chainWebpack: config => {
  //   config.module
  //     .rule('less')
  //     .oneOf('vue')
  //     .use('px2rem-loader')
  //     .loader('px2rem-loader')
  //     .before('postcss-loader') // this makes it work.
  //     .options({ remUnit: 37.5 })
  //     .end()
  // },
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [
  //         require('tailwindcss')(),
  //         require('autoprefixer')({
  //           overrideBrowserslist: require('./package.json').browserslist,
  //         }),
  //         require('postcss-pxtorem')({
  //           rootValue: 37.5,
  //           propList: ['*'],
  //         }),
  //       ],
  //     },
  //   },
  // },
  devServer: {
    disableHostCheck: true,
    port: 8080,
    proxy: {
      '/socket.io': {
        target: 'http://10.13.156.112:3000',
        changeOrigin: true,
        ws: true,
      },
      '/sockjs-node': {
        target: 'http://10.13.156.112:3000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
}
