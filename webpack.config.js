// プラグインを利用するためにwebpackを読み込んでおく
// const webpack = require("webpack");

// optimization.minimizerを上書きするために必要なプラグイン
const TerserPlugin = require("terser-webpack-plugin");

// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require("path");

module.exports = (env, argv) => {
  // argv.modeにはwebpackを実行したmodeが格納されている
  // 例えば webpack --mode development と実行すれば
  // argv.mode には 'development' が格納されている
  // そのためdevelopmentモードで実行したかどうかを判定できる
  const IS_DEVELOPMENT = argv.mode === "development";

  return {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    // mode: "development",
    // mode: "production",

    // メインとなるJavaScriptファイル（エントリーポイント）
    // entry: ["./src/app.js"],
    entry: ["./src/app.ts"],

    // 出力の設定
    output: {
      // 出力するファイル名
      filename: "bundle.js",
      // 出力先のパス（絶対パスを指定する必要がある）
      path: path.join(__dirname, "public/js")
    },
    // module: {
    //   rules: [
    //     {
    //       // 拡張子 .ts の場合
    //       test: /\.ts$/,
    //       // TypeScript をコンパイルする
    //       use: "ts-loader"
    //     }
    //   ]
    // },
    // // import 文で .ts ファイルを解決するため
    resolve: {
      extensions: [".ts"]
    },
    module: {
      rules: [
        {
          // ローダーの処理対象ファイル
          //   test: /\.js$/,
          test: /\.ts$/,
          // ローダーの処理対象から外すディレクトリ
          exclude: /node_modules/,
          use: [
            {
              // 利用するローダー
              loader: "babel-loader",
              // ローダーのオプション
              // 今回はbabel-loaderを利用しているため
              // babelのオプションを指定しているという認識で問題ない
              options: {
                plugins: [
                  // [
                  //   "@babel/plugin-transform-runtime",
                  //   {
                  //     regenerator: true
                  //   }
                  // ],
                  "@babel/proposal-class-properties",
                  "@babel/proposal-object-rest-spread"
                ]
              }
            }
          ]
        }
        // {
        //   // enforce: 'pre'を指定することによって
        //   // enforce: 'pre'がついていないローダーより早く処理が実行される
        //   // 今回はbabel-loaderで変換する前にコードを検証したいため、指定が必要
        //   enforce: "pre",
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: "eslint-loader"
        // }
      ]
    },
    // プラグインの設定
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     $: "jquery"
    //   })
    // ]
    // developmentモードで有効になるdevtool: 'eval'を上書き
    devtool: IS_DEVELOPMENT ? "source-map" : "none",
    // productionモードで有効になるoptimization.minimizerを上書きする
    optimization: {
      // developmentモードでビルドした場合
      // minimizer: [] となるため、consoleは残されたファイルが出力される
      // puroductionモードでビルドした場合
      // minimizer: [ new TerserPlugin({... となるため、consoleを削除したファイルが出力される
      minimizer: IS_DEVELOPMENT
        ? []
        : [
            new TerserPlugin({
              terserOptions: {
                compress: { drop_console: true }
              }
            })
          ]
    }
  };
};
