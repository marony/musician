import { Audio } from './audio';

// グローバル変数
declare global {
    interface Window {
        graphics: Graphics
    }
};

export class Figure {
    public x: number;
    public y: number;
    public w: number;
    public h: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    paint(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    isIn(x: number, y: number): boolean {
        return true;
    }
}

export class Graphics {
    figures: Figure[] = [];

    static init(canvas: HTMLCanvasElement | null) {
        window.graphics = new Graphics(canvas);
        return window.graphics;
    }

    private constructor(canvas: HTMLCanvasElement | null) {
        if (!canvas) {
            throw "HTMLCanvasElement is null";
        }
        canvas.addEventListener('click', (e: MouseEvent) => this.onClicked(e, canvas));
    }

    addFigure(fig: Figure) {
        this.figures.push(fig);
    }

    paint(canvas: HTMLCanvasElement | null) {
        if (!canvas) {
            throw "HTMLCanvasElement is null";
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw "can't get CanvasRenderingContext2d";
        }
        for (const fig of this.figures) {
            fig.paint(ctx);
        }
    }

    onClicked(e: MouseEvent, canvas: HTMLCanvasElement) {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;
        const d = x / 8;
        const hz = 440.0 * 2 ** (d / 12);

        console.log('canvas = ' + canvas);
        console.log('hz = ' + hz);
        console.log('graphics = ' + (window as any).graphics);

        const audio = new Audio();
        let gain = audio.createGain()
        let oscillator = audio.createOscillator();
        audio.connectDestination(gain);
        oscillator.connect(gain);
        oscillator.frequency.value = hz;
    
        oscillator.start(0);
        window.setTimeout(() => oscillator.stop(), 1000);
    }
}
