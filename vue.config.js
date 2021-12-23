module.exports = {
  productionSourceMap: process.env.NODE_ENV !== 'production', // 生产打包时不输出map文件，增加打包速度
  chainWebpack: config => {
    config.module
      .rule('less')
      .oneOf('vue')
      .use('px2rem-loader')
      .loader('px2rem-loader')
      .before('postcss-loader') // this makes it work.
      .options({ remUnit: 37.5 })
      .end()
  },
}
