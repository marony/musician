import { Audio } from './audio';

// グローバル変数
declare global {
    interface Window {
        graphics: Graphics
    }
};

// Canvasに描く図形
export class Figure {
    x: number;
    y: number;
    w: number;
    h: number;
    c: string;

    onMouseDown: (target: object) => void;
    onMouseUp: (target: object) => void;
    onMouseOver: (target: object) => void;
    onMouseOut: (target: object) => void;

    constructor(x: number, y: number, w: number, h: number, c: string,
        onMouseDown: (target: object) => void, onMouseUp: (target: object) => void,
        onMouseOver: (target: object) => void, onMouseOut: (target: object) => void) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.onMouseDown = onMouseDown;
        this.onMouseUp = onMouseUp;
        this.onMouseOver = onMouseOver;
        this.onMouseOut = onMouseOut;
    }

    paint(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    isIn(x: number, y: number): boolean {
        return (this.x <= x && x < this.x + this.w) &&
            (this.y <= y && y < this.y + this.h);
    }

    onClicked(): void {
        const d = this.x / 8;
        const hz = 440.0 * 2 ** (d / 12);

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

// Canvasへのo描画を担う
export class Graphics {
    figures: Figure[] = [];

    static init(canvas: HTMLCanvasElement | null): Graphics {
        window.graphics = new Graphics(canvas);
        return window.graphics;
    }

    private constructor(canvas: HTMLCanvasElement | null) {
        if (!canvas) {
            throw "HTMLCanvasElement is null";
        }
        canvas.addEventListener('mousedown', (e: MouseEvent) => this.onMouseDown(e, canvas));
        canvas.addEventListener('mouseup', (e: MouseEvent) => this.onMouseUp(e, canvas));
        canvas.addEventListener('mouseover', (e: MouseEvent) => this.onMouseOver(e, canvas));
        canvas.addEventListener('mouseout', (e: MouseEvent) => this.onMouseOut(e, canvas));
    }

    addFigure(fig: Figure): void {
        this.figures.push(fig);
    }

    paint(canvas: HTMLCanvasElement | null): void {
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

    onMouseDown(e: MouseEvent, canvas: HTMLCanvasElement): void {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        for (const fig of this.figures) {
            if (fig.isIn(x, y)) {
                if (fig.onMouseDown)
                    fig.onMouseDown(fig);
                break;
            }
        }
    }

    onMouseUp(e: MouseEvent, canvas: HTMLCanvasElement): void {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        for (const fig of this.figures) {
            if (fig.isIn(x, y)) {
                if (fig.onMouseUp)
                    fig.onMouseUp(fig);
                break;
            }
        }
    }

    onMouseOver(e: MouseEvent, canvas: HTMLCanvasElement): void {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        for (const fig of this.figures) {
            if (fig.isIn(x, y)) {
                if (fig.onMouseOver)
                    fig.onMouseOver(fig);
                break;
            }
        }
    }

    onMouseOut(e: MouseEvent, canvas: HTMLCanvasElement): void {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        for (const fig of this.figures) {
            if (fig.isIn(x, y)) {
                if (fig.onMouseOut)
                    fig.onMouseOut(fig);
                break;
            }
        }
    }
}
