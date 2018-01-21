var webpack = require("webpack"),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    ModernizrWebpackPlugin = require("modernizr-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    bootstrapEntryPoints = require('./webpack.bootstrap.config'),
    imagemin = require('imagemin'),
   imageminJpegtran = require('imagemin-jpegtran'),
	 imageminPngquant = require('imagemin-pngquant'),
	 gifsicle = require('imagemin-gifsicle'),
	 mozjpeg = require('imagemin-mozjpeg'),
	 optipng = require('imagemin-optipng'),
	 pngquant = require('imagemin-pngquant'),
	 webp = require('imagemin-webp'),

	bootstrapconfig = bootstrapEntryPoints.dev;

module.exports = {
	entry: {
		global : './src/main_app.js', 
		vendor : [
				  bootstrapconfig
		],
	},
	output: {
	  // adding chunk hash for browser to distinguish modules from each other
	  filename : 'js/[name].js',
	  path: path.resolve(__dirname, './dist')
	},
	module : {
		rules : [
		    
          //{ test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
          // for bootstrap
          //{ test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
        //  { test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' },

          {
      	  	test: /\.ejs$/,
      	  	use: 'ejs-html-loader'
      	  },
          { test: /\.scss$/, 
          	use : ExtractTextPlugin.extract({ 
          		fallback : 'style-loader',
          		use : ['css-loader?url=false', 'sass-loader?sourceMap']

          	})
      },
          
          // for font awesome TODO - possible that this isnt needed afterall since bootstrap's already exist
         { test: /\.woff(2)?(\?.*$|$)/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      	   { test: /\.(ttf|eot|svg)(\?.*$|$)/, loader: "file-loader" },

      	  
  		  {
    		test: /\.(gif|png|jpe?g|svg)$/,
    		use : [
      		'file-loader?name=image/[name].[ext]', {
        	loader: 'image-webpack-loader',
        	options: {
          	gifsicle: {
            	interlaced: false,
         	 },
          	optipng: {
            	optimizationLevel: 7,
          	},
          	pngquant: {
            	quality: '65-90',
            	speed: 4
          	},
          	mozjpeg: {
            	progressive: true,
            	quality: 65
          	},
          // Specifying webp here will create a WEBP version of your JPG/PNG images
          	webp: {
            	quality: 75
          	}
        }
      }
    ]
  }
      	  // image loader ends here   	 
		]
	},	
	plugins : [
		new ExtractTextPlugin({ 
			filename :'css/[name].css',
			disable : false,
			allChunks : true
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery : 'jquery'
		}),

		new HtmlWebpackPlugin({
			hash : true,
			template : 'ejs-render-loader!./BaseBundle/resources/views/base.ejs',
			inject : 'body'
		}),

    new HtmlWebpackPlugin({
       hash : true,
       filename : 'features.html',
       template : 'ejs-render-loader!./BaseBundle/resources/views/features.ejs',
       inject : 'body'
    }),

    new HtmlWebpackPlugin({
       hash : true,
       filename : 'download.html',
       template : 'ejs-render-loader!./BaseBundle/resources/views/download.ejs',
       inject : 'body'
    }),

    new HtmlWebpackPlugin({
       hash : true,
       filename : 'purchase.html',
       template : 'ejs-render-loader!./BaseBundle/resources/views/purchase.ejs',
       inject : 'body'
    }),

     new HtmlWebpackPlugin({
       hash : true,
       filename : 'partner.html',
       template : 'ejs-render-loader!./BaseBundle/resources/views/partner.ejs',
       inject : 'body'
    }),

     new HtmlWebpackPlugin({
       hash : true,
       filename : 'contact_us.html',
       template : 'ejs-render-loader!./BaseBundle/resources/views/contact.ejs',
       inject : 'body'
    }),


		new ModernizrWebpackPlugin(),

	]
};
