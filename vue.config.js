module.exports = {
    configureWebpack: {
        resolve:{
            alias:{
                'views':'@/views',
                'components':'@/components',
                'network':'@/network',
                'common':'@/common',
                'assets':'@/assets',
            }
        }
    },
    // devServer: { // 环境配置
    //     host: '0.0.0.0',
    //     public:'100.2.188.199:8080',
    //     port: 8080,
    //     https: false,
    //     hotOnly: false,
    //     disableHostCheck:true,
    //     open: true  配置自动启动浏览器
     
    // },
}