module.exports = {
  // Default for the style loading
  styleLoaders: ["style-loader", "css-loader", "sass-loader"],

  // If you want to use the ExtractTextPlugin
  extractStyles: true,

  // Use fontAwesomeCustomizations to utilize other sass variables defined in
  // _variables.scss file. This is useful to set one customization value based
  // on another value.
  fontAwesomeCustomizations: "./src/assets/sass/fa/_font-awesome.config.scss",
  
  styleLoader: require('extract-text-webpack-plugin').extract('style-loader', 'css-loader!less-loader'),
  styles: {
    "mixins": true,

    "path": true,
    "core": true,
    "larger": true,
    "fixed-width": true,
    "list": true,
    "bordered-pulled": true,
    "animated": true,
    "rotated-flipped": true,
    "stacked": true,
    "icons": true,
    "screen-reader": true,
  },
};
