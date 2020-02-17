/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/audio.ts":
/*!**********************!*\
  !*** ./src/audio.ts ***!
  \**********************/
/*! exports provided: Audio */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Audio\", function() { return Audio; });\n// Web Audio APIを扱う\nvar Audio = /** @class */ (function () {\n    function Audio() {\n        window.AudioContext = window.AudioContext || window.webkitAudioContext;\n        // Create the instance of AudioContext\n        this.context = new AudioContext();\n        // for legacy browsers\n        this.context.createGain = this.context.createGain || this.context.createGainNode;\n    }\n    Audio.prototype.connectDestination = function (node) {\n        node.connect(this.context.destination);\n    };\n    Audio.prototype.createGain = function () {\n        return this.context.createGain();\n    };\n    // OscillatorNode\n    // | type      | 波形を決定するためのプロパティ. 音色に大きく影響する. |\n    // | frequency | 周波数を決定するためのプロパティ. 音の高さ (ピッチ) に大きく影響する. |\n    // | detune    | 複数のサウンドを合成する場合において, 音の高さを微妙にずらして, サウンドに厚みを出したり, オクターブ違いの音をミックスしたりするのに利用する. 前者はシンセサイザーのファインチューン機能で, 後者はオクターバーエフェクト. |\n    // WaveType\n    // | 正弦波       | sine     | 0 |\n    // | 矩形波       | square   | 1 |\n    // | ノコギリ波   | sawtooth | 2 |\n    // | 三角波       | triangle | 3 |\n    // | カスタム波形 | custom   | 4 |\n    Audio.prototype.createOscillator = function () {\n        var oscillator = this.context.createOscillator();\n        // for legacy browsers\n        oscillator.start = oscillator.start || oscillator.noteOn;\n        oscillator.stop = oscillator.stop || oscillator.noteOff;\n        return oscillator;\n    };\n    return Audio;\n}());\n\n;\n/* 音声ファイル(WAV)を鳴らす\n    let AudioContext = window.AudioContext;// || window.webkitAudioContext;\n    let ac = new AudioContext();\n    let source = ac.createBufferSource();\n    source.connect(ac.destination);\n    source.start(0);\n\n    // 音声ファイルを読み込む\n    fetch('./sounds/2608_bd.wav')\n        .then(res => res.arrayBuffer())\n        .then(compressed => {\n            ac.decodeAudioData(compressed)\n                .then(decoded => {\n                    source.buffer = decoded;\n                });\n        });\n*/\n\n\n//# sourceURL=webpack:///./src/audio.ts?");

/***/ }),

/***/ "./src/audio_controller.ts":
/*!*********************************!*\
  !*** ./src/audio_controller.ts ***!
  \*********************************/
/*! exports provided: AudioController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AudioController\", function() { return AudioController; });\n/* harmony import */ var _audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio */ \"./src/audio.ts\");\n\nvar Note = /** @class */ (function () {\n    function Note(note) {\n        this.oscillator = null;\n        this.note = note;\n    }\n    Note.prototype.play = function (controller) {\n        var hz = 440.0 * Math.pow(2, (this.note / 12));\n        var audio = new _audio__WEBPACK_IMPORTED_MODULE_0__[\"Audio\"]();\n        var gain = audio.createGain();\n        var oscillator = audio.createOscillator();\n        oscillator.type = 'sawtooth';\n        audio.connectDestination(gain);\n        oscillator.connect(gain);\n        oscillator.frequency.value = hz;\n        oscillator.start(0);\n        this.oscillator = oscillator;\n    };\n    Note.prototype.stop = function (controller) {\n        var oscillator = this.oscillator;\n        if (!oscillator) {\n            return;\n        }\n        this.oscillator = null;\n        window.setTimeout(function () { return oscillator.stop(); }, 200);\n    };\n    return Note;\n}());\n// UIと音声の橋渡し\nvar AudioController = /** @class */ (function () {\n    function AudioController() {\n        this.notes = [];\n    }\n    AudioController.prototype.onMouseDown = function (fig) {\n        console.log(\"onMouseDown: \" + fig.note);\n        var index = this.notes.findIndex(function (n) { return fig.note == n.note; });\n        if (index >= 0) {\n            // 既に鳴っているので何もしない\n            return;\n        }\n        // 音を鳴らす\n        var note = new Note(fig.note);\n        this.notes.push(note);\n        note.play(this);\n    };\n    AudioController.prototype.onMouseUp = function (fig) {\n        var index = this.notes.findIndex(function (n) { return fig.note == n.note; });\n        console.log(\"onMouseUp: \" + fig.note + \", \" + index);\n        if (index < 0) {\n            // 鳴ってないので何もしない\n            return;\n        }\n        // 音を止める\n        var note = this.notes[index];\n        note.stop(this);\n        this.notes.splice(index, 1);\n    };\n    AudioController.prototype.onMouseOver = function (fig) {\n        console.log(\"onMouseOver: \" + fig.note);\n        this.onMouseDown(fig);\n    };\n    AudioController.prototype.onMouseOut = function (fig) {\n        console.log(\"onMouseOut: \" + fig.note);\n        this.onMouseUp(fig);\n    };\n    return AudioController;\n}());\n\n\n\n//# sourceURL=webpack:///./src/audio_controller.ts?");

/***/ }),

/***/ "./src/figure.ts":
/*!***********************!*\
  !*** ./src/figure.ts ***!
  \***********************/
/*! exports provided: Figure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Figure\", function() { return Figure; });\n// Canvasに描く図形\nvar Figure = /** @class */ (function () {\n    function Figure(x, y, width, height, color, eventHandler) {\n        this.x = x;\n        this.y = y;\n        this.width = width;\n        this.height = height;\n        this.color = color;\n        this.eventHandler = eventHandler;\n    }\n    Figure.prototype.paint = function (ctx) {\n        ctx.fillStyle = this.color;\n        ctx.fillRect(this.x, this.y, this.width, this.height);\n        ctx.fillStyle = 'black';\n        ctx.strokeRect(this.x, this.y, this.width, this.height);\n    };\n    Figure.prototype.isIn = function (x, y) {\n        return (this.x <= x && x < this.x + this.width) &&\n            (this.y <= y && y < this.y + this.height);\n    };\n    return Figure;\n}());\n\n\n\n//# sourceURL=webpack:///./src/figure.ts?");

/***/ }),

/***/ "./src/graphics.ts":
/*!*************************!*\
  !*** ./src/graphics.ts ***!
  \*************************/
/*! exports provided: Graphics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Graphics\", function() { return Graphics; });\n;\n// Canvasへのo描画を担う\nvar Graphics = /** @class */ (function () {\n    function Graphics(canvas) {\n        var _this = this;\n        this.figures = [];\n        this.prevFigure = null;\n        if (!canvas) {\n            throw \"HTMLCanvasElement is null\";\n        }\n        canvas.addEventListener('mousedown', function (e) { return _this.onMouseDown(e, canvas); });\n        canvas.addEventListener('mouseup', function (e) { return _this.onMouseUp(e, canvas); });\n        canvas.addEventListener('mousemove', function (e) { return _this.onMouseMove(e, canvas); });\n        canvas.addEventListener('mouseout', function (e) { return _this.onMouseOut(e, canvas); });\n    }\n    // ファクトリメソッド\n    Graphics.init = function (canvas) {\n        window.graphics = new Graphics(canvas);\n        return window.graphics;\n    };\n    Graphics.prototype.addFigure = function (fig) {\n        this.figures.push(fig);\n    };\n    Graphics.prototype.paint = function (canvas) {\n        if (!canvas) {\n            throw \"HTMLCanvasElement is null\";\n        }\n        var ctx = canvas.getContext('2d');\n        if (!ctx) {\n            throw \"can't get CanvasRenderingContext2d\";\n        }\n        for (var _i = 0, _a = this.figures; _i < _a.length; _i++) {\n            var fig = _a[_i];\n            fig.paint(ctx);\n        }\n    };\n    Graphics.prototype.onMouseDown = function (e, canvas) {\n        var x = e.clientX - canvas.offsetLeft;\n        var y = e.clientY - canvas.offsetTop;\n        // 逆順(上にo表示されている門から)走査\n        for (var i = this.figures.length - 1; i >= 0; --i) {\n            var fig = this.figures[i];\n            if (fig.isIn(x, y)) {\n                if (fig.eventHandler)\n                    fig.eventHandler.onMouseDown(fig);\n                this.prevFigure = fig;\n                break;\n            }\n        }\n    };\n    Graphics.prototype.onMouseUp = function (e, canvas) {\n        var x = e.clientX - canvas.offsetLeft;\n        var y = e.clientY - canvas.offsetTop;\n        // 逆順(上にo表示されている門から)走査\n        for (var i = this.figures.length - 1; i >= 0; --i) {\n            var fig = this.figures[i];\n            if (fig.isIn(x, y)) {\n                if (fig.eventHandler)\n                    fig.eventHandler.onMouseUp(fig);\n                this.prevFigure = null;\n                break;\n            }\n        }\n    };\n    Graphics.prototype.onMouseMove = function (e, canvas) {\n        var x = e.clientX - canvas.offsetLeft;\n        var y = e.clientY - canvas.offsetTop;\n        if (!this.prevFigure) {\n            // 鳴ってないので何もしない\n            return;\n        }\n        // 逆順(上にo表示されている門から)走査\n        // ここでFigureごとの'onMouseOver'と'onMouseOut'をエミュレーションする\n        var nowFig = null;\n        for (var i = this.figures.length - 1; i >= 0; --i) {\n            var fig = this.figures[i];\n            if (fig.isIn(x, y)) {\n                nowFig = fig;\n                break;\n            }\n        }\n        // if (nowFig && this.prevFigure.note == nowFig.note) {\n        //     // 同じ鍵盤の上なので何もしない\n        //     return;\n        // }\n        // // 前の鍵盤から'MouseOut'して後の鍵盤に'MouseOver'するイベントを発生させる\n        // if (this.prevFigure.note != nowFig?.note) {\n        //     if (this.prevFigure) {\n        //         const prevFigure = this.prevFigure;\n        //         this.prevFigure = null;\n        //         if (prevFigure.eventHandler)\n        //             prevFigure.eventHandler.onMouseOut(prevFigure);\n        //     }\n        //     if (nowFig) {\n        //         this.prevFigure = nowFig;\n        //         if (nowFig.eventHandler)\n        //             nowFig.eventHandler.onMouseOver(nowFig);\n        //     }\n        // }\n    };\n    Graphics.prototype.onMouseOut = function (e, canvas) {\n        // すべて音を消す\n        for (var i = this.figures.length - 1; i >= 0; --i) {\n            var fig = this.figures[i];\n            if (fig.eventHandler)\n                fig.eventHandler.onMouseUp(fig);\n        }\n        this.prevFigure = null;\n    };\n    return Graphics;\n}());\n\n\n\n//# sourceURL=webpack:///./src/graphics.ts?");

/***/ }),

/***/ "./src/key.ts":
/*!********************!*\
  !*** ./src/key.ts ***!
  \********************/
/*! exports provided: Key */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Key\", function() { return Key; });\n/* harmony import */ var _figure__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./figure */ \"./src/figure.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n// 鍵盤\nvar Key = /** @class */ (function (_super) {\n    __extends(Key, _super);\n    function Key(x, y, width, height, color, note, eventHandler) {\n        var _this = _super.call(this, x, y, width, height, color, eventHandler) || this;\n        _this.note = note;\n        return _this;\n    }\n    Key.prototype.hz = function () {\n        return 440.0 * Math.pow(2, (this.note / 12));\n    };\n    return Key;\n}(_figure__WEBPACK_IMPORTED_MODULE_0__[\"Figure\"]));\n\n\n\n//# sourceURL=webpack:///./src/key.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphics */ \"./src/graphics.ts\");\n/* harmony import */ var _audio_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio_controller */ \"./src/audio_controller.ts\");\n/* harmony import */ var _key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./key */ \"./src/key.ts\");\n/* harmony import */ var _figure__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./figure */ \"./src/figure.ts\");\n\n\n\n\n// まいんちゃん\nvar main = function () {\n    // canvasに何か描くよ\n    var canvas = document.getElementById('canvas');\n    var graphics = _graphics__WEBPACK_IMPORTED_MODULE_0__[\"Graphics\"].init(canvas);\n    var controller = new _audio_controller__WEBPACK_IMPORTED_MODULE_1__[\"AudioController\"]();\n    var figure = new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](0, 0, 0, 0, '', 0, controller);\n    var key = new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](0, 0, 0, 0, '', 0, controller);\n    var figure2 = new _figure__WEBPACK_IMPORTED_MODULE_3__[\"Figure\"](0, 0, 0, 0, '', controller);\n    console.log(typeof figure);\n    console.log(typeof key);\n    console.log(typeof figure2);\n    console.log(figure instanceof _figure__WEBPACK_IMPORTED_MODULE_3__[\"Figure\"]);\n    console.log(figure instanceof _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"]);\n    console.log(key instanceof _figure__WEBPACK_IMPORTED_MODULE_3__[\"Figure\"]);\n    console.log(key instanceof _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"]);\n    console.log(figure2 instanceof _figure__WEBPACK_IMPORTED_MODULE_3__[\"Figure\"]);\n    console.log(figure2 instanceof _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"]);\n    // 白鍵\n    graphics.addFigure(new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](0, 0, 43, 150, 'white', 0, controller));\n    graphics.addFigure(new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](43, 0, 43, 150, 'white', 2, controller));\n    graphics.addFigure(new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](86, 0, 43, 150, 'white', 4, controller));\n    graphics.addFigure(new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](129, 0, 43, 150, 'white', 5, controller));\n    graphics.addFigure(new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](172, 0, 43, 150, 'white', 7, controller));\n    graphics.addFigure(new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](215, 0, 43, 150, 'white', 9, controller));\n    graphics.addFigure(new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](258, 0, 43, 150, 'white', 11, controller));\n    // 黒鍵\n    graphics.addFigure(new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](26, 0, 33, 100, 'black', 1, controller));\n    graphics.addFigure(new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](69, 0, 33, 100, 'black', 3, controller));\n    graphics.addFigure(new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](155, 0, 33, 100, 'black', 6, controller));\n    graphics.addFigure(new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](198, 0, 33, 100, 'black', 8, controller));\n    graphics.addFigure(new _key__WEBPACK_IMPORTED_MODULE_2__[\"Key\"](241, 0, 33, 100, 'black', 10, controller));\n    graphics.paint(canvas);\n};\nmain();\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ });