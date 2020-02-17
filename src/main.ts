import { Graphics } from './graphics';
import { AudioController } from './audio_controller';
import { Key } from './key';

// まいんちゃん
const main = () => {
    // canvasに何か描くよ
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    const graphics = Graphics.init(canvas);
    const controller = new AudioController();

    // 白鍵
    graphics.addFigure(new Key(0, 0, 43, 150, 'white', 0, controller));
    graphics.addFigure(new Key(43, 0, 43, 150, 'white', 2, controller));
    graphics.addFigure(new Key(86, 0, 43, 150, 'white', 4, controller));
    graphics.addFigure(new Key(129, 0, 43, 150, 'white', 5, controller));
    graphics.addFigure(new Key(172, 0, 43, 150, 'white', 7, controller));
    graphics.addFigure(new Key(215, 0, 43, 150, 'white', 9, controller));
    graphics.addFigure(new Key(258, 0, 43, 150, 'white', 11, controller));
    // 黒鍵
    graphics.addFigure(new Key(26, 0, 33, 100, 'black', 1, controller));
    graphics.addFigure(new Key(69, 0, 33, 100, 'black', 3, controller));
    graphics.addFigure(new Key(155, 0, 33, 100, 'black', 6, controller));
    graphics.addFigure(new Key(198, 0, 33, 100, 'black', 8, controller));
    graphics.addFigure(new Key(241, 0, 33, 100, 'black', 10, controller));

    graphics.paint(canvas);
};

main();
