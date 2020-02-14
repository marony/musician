import { Graphics } from './graphics';
import { Audio } from './audio';
import { AudioController } from './audio_controller';
import { Figure } from './figure';

// まいんちゃん
const main = () => {
    // canvasに何か描くよ
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    const graphics = Graphics.init(canvas);
    const controller = new AudioController();

    // 白鍵
    graphics.addFigure(new Figure(0, 0, 43, 150, 'white', 0, controller));
    graphics.addFigure(new Figure(43, 0, 43, 150, 'white', 2, controller));
    graphics.addFigure(new Figure(86, 0, 43, 150, 'white', 4, controller));
    graphics.addFigure(new Figure(129, 0, 43, 150, 'white', 5, controller));
    graphics.addFigure(new Figure(172, 0, 43, 150, 'white', 7, controller));
    graphics.addFigure(new Figure(215, 0, 43, 150, 'white', 9, controller));
    graphics.addFigure(new Figure(258, 0, 43, 150, 'white', 11, controller));
    // 黒鍵
    graphics.addFigure(new Figure(26, 0, 33, 100, 'black', 1, controller));
    graphics.addFigure(new Figure(69, 0, 33, 100, 'black', 3, controller));
    graphics.addFigure(new Figure(155, 0, 33, 100, 'black', 6, controller));
    graphics.addFigure(new Figure(198, 0, 33, 100, 'black', 8, controller));
    graphics.addFigure(new Figure(241, 0, 33, 100, 'black', 10, controller));

    graphics.paint(canvas);
};

main();
