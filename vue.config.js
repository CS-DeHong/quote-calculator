const { defineConfig } = require("@vue/cli-service");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const packageName = "quote-calculator";

const copyFiles = [
  {
    from: path.resolve("src/manifest.json"),
    to: path.resolve(packageName, "manifest.json"),
  },
  {
    from: path.resolve("public"),
    to: path.resolve(packageName),
  },
];

const plugins = [
  new CopyWebpackPlugin({
    patterns: copyFiles,
  }),
];

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    sidepanel: {
      entry: `src/sidepanel/sidepanel.js`,
      template: `src/sidepanel/sidepanel.html`,
      filename: `sidepanel.html`,
    },
  },
  productionSourceMap: false,
  outputDir: path.join(__dirname, packageName),
  configureWebpack: {
    watch: true,
    entry: {
      // content: "./src/content-scripts/content-script.js",
      "service-worker": "./src/background/service-worker.js",
      sidepanel: "./src/sidepanel/sidepanel.js",
    },
    output: {
      filename: "js/[name].js", //输出路径
    },
    plugins,
    optimization: {
      splitChunks: false, // 不允许切分，打包时文件太大的情况会被webpack切分成几个文件
    },
  },
  css: {
    extract: {
      filename: "css/[name].css", // 提取CSS
    },
  },
});
