const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './main.js',
   resolve: {
       alias: {
           vue: 'vue/dist/vue.esm-bundler'
       }
   },
 devServer: {
   static: path.join(__dirname, 'src'),
   compress: true,
   port: 8080
 },
 module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
 plugins: [
  new VueLoaderPlugin(),
   new webpack.DefinePlugin({
     __VUE_OPTIONS_API__: true,
     __VUE_PROD_DEVTOOLS__: false
   })
 ]
};
