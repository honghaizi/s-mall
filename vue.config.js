//配置别名
module.exports = {
	configureWebpack: {//表示配置 config
		resolve: { //解决路径问题
			// extensions:[] //路径后缀名
			alias: { //别名
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				// 'views': '@/views'
				/*router 没必要
					'router': '@/router',
					1.一般只在 main.js 引用
					2.this.$router 就可以获取
				*/
			}
		}
	}
}