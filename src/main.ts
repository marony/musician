import {hello} from './sub';

const message: string = 'Hello World';

// sub.jsに定義されたJavaScriptを実行する。
hello(message);

const str2ab = (str: string): ArrayBuffer => {
    const buf = new ArrayBuffer(str.length * 2);
    const bufView = new Uint16Array(buf);
    for (let i = 0; i < str.length; ++i) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

export function play() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './sounds/2608_bd.wav', true);
    xhr.responseType = 'arraybuffer';
    console.log(xhr.responseType);
    console.log("1");
    xhr.onload = function() {
        let arrayBuffer = xhr.response;

        let AudioContext = window.AudioContext;// || window.webkitAudioContext;
        let ac = new AudioContext();
        ac.decodeAudioData(arrayBuffer, function(audioBuffer) {
            console.log("3");
            let source = ac.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ac.destination);
            source.start(0);
        });
    };
    xhr.send();
}

let button = document.getElementById('play');
button?.addEventListener('click', (e: Event) => play());
