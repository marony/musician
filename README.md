# Musician 

## 仕様

## 手順

[最新版TypeScript+webpack 4の環境構築まとめ（React, Vue.js, Three.jsのサンプル付き） - ICS MEDIA](https://ics.media/entry/16329/)

### node初期化
```
$ mkdir musician
$ cd musician
$ npm init -y
$ git init
$ gibo dump macos linux windows node > .gitignore
```

### TypeScriptのインストール
```
$ npm install --save-dev webpack webpack-cli typescript ts-loader
$ npx tsc --version
Version 3.7.5
```

### package.json
```
  "scripts": {
-   "test": ...
+   "build": "webpack",
+   "watch": "webpack -w"
  },

- }
+ },
  "private": true
```

### tsconfig.json作成
```
$ npx tsc --init
$ nvim tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
-   "module": "commonjs",
+   "module": "es2015",
+   "sourceMap": true,
+   "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
```

### webpackの設定(webpack.config.js)
```
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/main.ts",

  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader"
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [".ts"]
  }
};
```

### Hello, World!
```
$ nvim index.html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <script defer src="dist/main.js"></script>
</head>
<body>
</body>
</html>

$ mkdir src
$ nvim src/main.ts
import {hello} from './sub';

const message: string = 'Hello World';

// sub.jsに定義されたJavaScriptを実行する。
hello(message);

$ nvim src/sub.ts
// module.exportを使ってhello関数を定義する。
export const hello = (message: string): void => {

  log(message);
};

function log(message: string) :void{
  document.body.innerHTML = (`${message}`);

  console.log(`${message}を出力しました`);
}

export function piyo(){

}

$ npm run build
```

