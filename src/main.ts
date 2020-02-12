import { Audio } from './audio';

export function play() {
    // OscillatorNode (Input) -> GainNode (Volume) -> AudioDestinationNode (Output)
    const audio = new Audio();
    let gain = audio.createGain()
    let oscillator = audio.createOscillator();
    audio.connectDestination(gain);
    oscillator.connect(gain);

    oscillator.start(0);
    window.setTimeout(() => oscillator.stop(), 1000);

    // let AudioContext = window.AudioContext;// || window.webkitAudioContext;
    // let ac = new AudioContext();
    // let source = ac.createBufferSource();
    // source.connect(ac.destination);
    // source.start(0);

    // // 音声ファイルを読み込む
    // fetch('./sounds/2608_bd.wav')
    //     .then(res => res.arrayBuffer())
    //     .then(compressed => {
    //         ac.decodeAudioData(compressed)
    //             .then(decoded => {
    //                 source.buffer = decoded;
    //             });
    //     });
}

const main = () => {
    // クリックされたらplay()を呼ぶ
    let button = document.getElementById('play');
    button?.addEventListener('click', (e: Event) => play());

    // canvasに何か描くよ
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);
};

main();
