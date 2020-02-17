# Musician 

ブラウザ上で作曲ツール
まずは音を鳴らす

## ToDo
- [x] 音を鳴らす
- [x] TypeScriptなのにAudioContextやCanvasの型が付いてない
- [ ] GUIをどうするか考える
  - [ ] 鍵盤はCanvas
  - [ ] GUIはどうしよう？
  - [ ] 音源・シンセの仕組みを考える

## 仕様

### クラス一覧
#### Graphics
追加された図形(Figure)に応じたグラフィックの描画と、Canvasでイベントが発生した場合に対応する図形(Figure)にイベントを伝播する。

#### Figure
Graphicsに描画される図形を表す基底クラス。  
描画のために座標と幅高さと色を持つ。  
また、対応するイベントに応答するためにイベントハンドラを持つ。

#### Key
Figureから派生した鍵盤の一つのキーを表すクラス。  
A4(440Hz)を0とした音階を持つ。

#### EventHandler<T>
Keyにセットするためのイベントハンドラを持つインターフェース。

#### AudioController
EventHandler<Key>を実装したクラス。  
鍵盤が押された場合に音を鳴らす責務を持つ。

#### Audio
Web Audio APIを扱いやすいようにラップしたクラス。

### 音階の周波数
A3 = 220
A4 = 440
A5 = 880

d = A4を0とした数字

440 * (d/12)√2 -> d/12乗oすると2になる数
= 440 * 2 ** (d / 12)

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
+   "lib": ["ESNext", "DOM"],
+   "sourceMap": true,
+   "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true

  },
+ "include": [
+   "./src/**/*.ts"
+ ]
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
```
```
$ nvim src/sub.ts
// module.exportを使ってhello関数を定義する。
export const hello = (message: string): void => {
  log(message);
};

function log(message: string) :void{
  document.body.innerHTML = (`${message}`);
  console.log(`${message}を出力しました`);
}

$ npm run build
```

### http-serverでテストする
$ npm install --save http-server
$ npx http-server

ブラウザで`http://localhost:8080/`にアクセスする
