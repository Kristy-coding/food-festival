// const path = require("path");
// const webpack = require("webpack");
// require("bootstrap");

// //The entry point is the root of the bundle and the beginning of the dependency graph, so give it the relative path to the client's code. 
// module.exports = {
//     entry: './assets/js/script.js',
//     //webpack will next take the entry point we have provided, bundle that code, and output that bundled code to a folder that we specify. It is common and best practice to put your bundled code into a folder named dist, which is short for distribution. Add the following code
//     output: {path: path.resolve(__dirname, 'dist'), filename: 'main.budle.js'},
    
//     plugins: [
//         new webpack.ProvidePlugin({
//             $: "jquery",
//             jQuery: "jquery"
//         }),
//     ],
//     //The final piece of our basic setup will provide the mode in which we want webpack to run. By default, webpack wants to run in production mode. In this mode, webpack will minify our code for us automatically, along with some other nice additions. We want our code to run in development mode, so add the following code
//     mode: 'development'

// }

const webpack = require("webpack")
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
  },
  //In the config object, we added an object to the rules array. This object will identify the type of files to pre-process using the test property to find a regular expression, or regex. In our case, we are trying to process any image file with the file extension of .jpg. We could expand this expression to also search for other image file extensions such as .png, .svg, or .gif
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                return "[path][name].[ext]"
              },
              publicPath: function(url){
                return url.replace("../", "assets/")
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    //Notice that when we added the BundleAnalyzerPlugin, we configured the analyzerMode property with a static value. This will output an HTML file called report.html that will generate in the dist folder.
    //We can also set this value to disable to temporarily stop the reporting and automatic opening of this report in the browser.
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    })

  ],
  mode: "development"
};