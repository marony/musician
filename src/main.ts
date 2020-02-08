import {hello} from './sub';

const message: string = 'Hello World';

// sub.jsに定義されたJavaScriptを実行する。
hello(message);

export function play() {
    let AudioContext = window.AudioContext;// || window.webkitAudioContext;
    let ac = new AudioContext();
    let source = ac.createBufferSource();
    source.connect(ac.destination);
    source.start(0);

    // 音声ファイルを読み込む
    fetch('./sounds/2608_bd.wav')
        .then(res => res.arrayBuffer())
        .then(compressed => {
            ac.decodeAudioData(compressed)
                .then(decoded => {
                    source.buffer = decoded;
                });
        });
}

// クリックされたらplay()を呼ぶ
let button = document.getElementById('play');
button?.addEventListener('click', (e: Event) => play());
