var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require("./webpack.config.js");

Object.keys(config.entry).forEach(function (key) {
  config.entry[key].unshift(
    'webpack-dev-server/client?http://localhost:8080', // 変更を検知した後、webpack/hot/dev-serverに処理を委譲する
    'webpack/hot/dev-server' // HotModuleReplacementPluginにモジュールの更新を行わせる。
  );
});

config.plugins = [
  // 1. 変更されたモジュールのみ含まれるファイルを生成する（Webpackのコンパイル時の挙動）
  // 2. 変更されたmoduleがHMR可能かどうかを調べ、可能であれば置き換えるためのコードをjsソースに含める
  new webpack.HotModuleReplacementPlugin(), 
];

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    publicPath: '/public',
    hot: true, // hotモードを有効にする。
    proxy: { '*': 'http://localhost:3000' } // proxyの設定
});
server.listen(8080);
