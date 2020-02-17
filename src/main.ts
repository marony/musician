import { Graphics } from './graphics';
import { AudioController } from './audio_controller';
import { Key } from './key';

const addKeys = (graphics: Graphics, base: number, x: number,
    width: number, height: number, controller: AudioController): void => {
    const ns = [0, 2, 4, 5, 7, 9, 11, 1, 3, 6, 8, 10];
    // 白鍵
    {
        const w = width / 7;
        for (let xx = x; xx < x + width; xx += w) {
            const d = ns.shift() as number;
            const key = new Key(xx, 0, w, height, 'white', base + d, controller);
            graphics.addFigure(key);
        }
    }
    // 黒鍵
    {
        const is = [0, 1, 3, 4, 5];
        for (const i in is) {
            const index = is[i];
            const w = width / 7;
            const w2 = w * 0.6;
            const d = ns.shift() as number;
            const key = new Key(x + (w * index) + w / 2 + (w - w2) / 2, 0, w2, height * 0.7, 'black', base + d, controller);
            graphics.addFigure(key);
        }
    }
}

// まいんちゃん
const main = () => {
    const wrapper = document.getElementById('wrapper');
    console.log(wrapper?.clientWidth);
    console.log(wrapper?.clientHeight);
    // canvasに何か描くよ
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    const width = wrapper?.clientWidth as number;
    const height = wrapper?.clientWidth as number;
    if (canvas) {
        canvas.width = width;
        canvas.height = height;
    }
    const graphics = Graphics.init(canvas);
    const controller = new AudioController();

    const count = 3;
    addKeys(graphics, 12 * -1, (width / count) * 0, width / count, height, controller);
    addKeys(graphics, 12 * 0, (width / count) * 1, width / count, height, controller);
    addKeys(graphics, 12 * 1, (width / count) * 2, width / count, height, controller);
    // // 白鍵
    // graphics.addFigure(new Key(0, 0, 43, 150, 'white', 0, controller));
    // graphics.addFigure(new Key(43, 0, 43, 150, 'white', 2, controller));
    // graphics.addFigure(new Key(86, 0, 43, 150, 'white', 4, controller));
    // graphics.addFigure(new Key(129, 0, 43, 150, 'white', 5, controller));
    // graphics.addFigure(new Key(172, 0, 43, 150, 'white', 7, controller));
    // graphics.addFigure(new Key(215, 0, 43, 150, 'white', 9, controller));
    // graphics.addFigure(new Key(258, 0, 43, 150, 'white', 11, controller));
    // // 黒鍵
    // graphics.addFigure(new Key(26, 0, 33, 100, 'black', 1, controller));
    // graphics.addFigure(new Key(69, 0, 33, 100, 'black', 3, controller));
    // graphics.addFigure(new Key(155, 0, 33, 100, 'black', 6, controller));
    // graphics.addFigure(new Key(198, 0, 33, 100, 'black', 8, controller));
    // graphics.addFigure(new Key(241, 0, 33, 100, 'black', 10, controller));

    graphics.paint(canvas);
};

main();
