import { Graphics, Figure } from './graphics';
import { Audio } from './audio';
import { AudioController } from './audio_controller';

// 'Play'ボタンが押されたら音を鳴らす
export function play() {
    // OscillatorNode (Input) -> GainNode (Volume) -> AudioDestinationNode (Output)
    const audio = new Audio();
    let gain = audio.createGain()
    let oscillator = audio.createOscillator();
    audio.connectDestination(gain);
    oscillator.connect(gain);

    oscillator.start(0);
    window.setTimeout(() => oscillator.stop(), 1000);
}

// まいんちゃん
const main = () => {
    // クリックされたらplay()を呼ぶ
    let button = document.getElementById('play');
    button?.addEventListener('click', (e: Event) => play());

    // canvasに何か描くよ
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    const graphics = Graphics.init(canvas);
    const controller = new AudioController();

    graphics.addFigure(new Figure(0, 0, 75, 300, 'red',
        controller.onMouseDown, controller.onMouseUp,
        controller.onMouseOver, controller.onMouseOut));
    graphics.addFigure(new Figure(75, 0, 75, 300, 'blue',
        controller.onMouseDown, controller.onMouseUp,
        controller.onMouseOver, controller.onMouseOut));
    graphics.addFigure(new Figure(150, 0, 75, 300, 'yellow',
        controller.onMouseDown, controller.onMouseUp,
        controller.onMouseOver, controller.onMouseOut));
    graphics.addFigure(new Figure(225, 0, 75, 300, 'green',
        controller.onMouseDown, controller.onMouseUp,
        controller.onMouseOver, controller.onMouseOut));

    graphics.paint(canvas);
};

main();
