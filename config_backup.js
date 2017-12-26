var webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
	path = require('path'),
    bootstrapEntryPoints = require('./webpack.bootstrap.config');



var bootstrapconfig = bootstrapEntryPoints.dev;


module.exports = {
	entry: {
		main : './src/main_app.js', 
		vendor : [
				bootstrapconfig
		]
	},
	output: {
	  // adding chunk hash for browser to distinguish modules from each other
	  filename : 'js/[name].[hash].js',
	  path: path.resolve(__dirname, '/dist')
	},
	module : {
		rules : [
		 { test: /\.css$/, 
          	use : ExtractTextPlugin.extract({ 
          		fallback : 'style-loader',
          		use : 'css-loader',
          		publicPath : '/dist'

          	})
      },
          //{ test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
          { test: /\.(woff2?|svg)$/, use: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
          { test: /\.(ttf|eot)$/, use: 'file-loader?name=fonts/[name].[ext]' }
         
		]
	},	
	plugins : [
		new ExtractTextPlugin({
			filename : 'css/[name].css',
			disable : false,
			allChunks : true
		}),

		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery : 'jquery'
		}),

		// etracting libraries into a seperate module to limit server request whenever 
		// local source code changes

		new webpack.optimize.CommonsChunkPlugin({
				name : 'vendor'
		}),

		// for caching to extract webpack boiler plate

		new webpack.optimize.CommonsChunkPlugin({
			name : 'manifest'
		}),

		// for Scope hoisting. to speed up the execution of js files
		new webpack.optimize.ModuleConcatenationPlugin(),
	]
};
