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

module.exports = {
  entry: "./assets/js/script.js",
  output: {
    path: path.join(__dirname + "/dist"),
    filename: "main.bundle.js"
  },
  plugins: [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  }),
  ],
  mode: "development"
};