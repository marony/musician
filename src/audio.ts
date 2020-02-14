// Web Audio APIを扱う
export class Audio {
    context: AudioContext;

    constructor() {
        window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        // Create the instance of AudioContext
        this.context = new AudioContext();
        // for legacy browsers
        this.context.createGain = this.context.createGain || (this.context as any).createGainNode;
    }

    connectDestination(node: AudioNode) {
        node.connect(this.context.destination);
    }

    createGain(): GainNode {
        return this.context.createGain();
    }

    // OscillatorNode
    // | type      | 波形を決定するためのプロパティ. 音色に大きく影響する. |
    // | frequency | 周波数を決定するためのプロパティ. 音の高さ (ピッチ) に大きく影響する. |
    // | detune    | 複数のサウンドを合成する場合において, 音の高さを微妙にずらして, サウンドに厚みを出したり, オクターブ違いの音をミックスしたりするのに利用する. 前者はシンセサイザーのファインチューン機能で, 後者はオクターバーエフェクト. |
    // WaveType
    // | 正弦波       | sine     | 0 |
    // | 矩形波       | square   | 1 |
    // | ノコギリ波   | sawtooth | 2 |
    // | 三角波       | triangle | 3 |
    // | カスタム波形 | custom   | 4 |
    createOscillator(): OscillatorNode {
        let oscillator = this.context.createOscillator();
        // for legacy browsers
        oscillator.start = oscillator.start || (oscillator as any).noteOn;
        oscillator.stop  = oscillator.stop  || (oscillator as any).noteOff;
        return oscillator;
    }
};

/* 音声ファイル(WAV)を鳴らす
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
*/
