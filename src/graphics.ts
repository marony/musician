import { Figure } from "./figure";
import { Key } from "./key";

// グローバル変数
declare global {
    interface Window {
        graphics: Graphics
    }
};

// Canvasへのo描画を担う
export class Graphics {
    figures: Figure[] = [];
    prevKey: Key | null = null;

    // ファクトリメソッド
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
        canvas.addEventListener('mousemove', (e: MouseEvent) => this.onMouseMove(e, canvas));
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

        // 逆順(上にo表示されている門から)走査
        for (let i = this.figures.length - 1; i >= 0; --i) {
            const fig = this.figures[i];
            if (fig.isIn(x, y)) {
                if (fig.eventHandler)
                    fig.eventHandler.onMouseDown(fig);
                if (fig instanceof Key)
                    this.prevKey = fig;
                break;
            }
        }
    }

    onMouseUp(e: MouseEvent, canvas: HTMLCanvasElement): void {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        // 逆順(上にo表示されている門から)走査
        for (let i = this.figures.length - 1; i >= 0; --i) {
            const fig = this.figures[i];
            if (fig.isIn(x, y)) {
                if (fig.eventHandler)
                    fig.eventHandler.onMouseUp(fig);
                this.prevKey = null;
                break;
            }
        }
    }

    onMouseMove(e: MouseEvent, canvas: HTMLCanvasElement): void {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        if (!this.prevKey) {
            // 鳴ってないので何もしない
            return;
        }
        // 逆順(上にo表示されている門から)走査
        // ここでFigureごとの'onMouseOver'と'onMouseOut'をエミュレーションする
        let nowFig: Figure | null = null;
        for (let i = this.figures.length - 1; i >= 0; --i) {
            const fig = this.figures[i];
            if (fig.isIn(x, y)) {
                nowFig = fig;
                break;
            }
        }
        let prevNote = this.prevKey.note;
        let nowNote = -1;
        if (nowFig && nowFig instanceof Key)
            nowNote = (nowFig as Key).note;
        // instanceof
        if (nowNote == prevNote) {
            // 同じ鍵盤の上なので何もしない
            return;
        }
        // 前の鍵盤から'MouseOut'して後の鍵盤に'MouseOver'するイベントを発生させる
        if (this.prevFigure.note != nowFig?.note) {
            if (this.prevFigure) {
                const prevFigure = this.prevFigure;
                this.prevFigure = null;
                if (prevFigure.eventHandler)
                    prevFigure.eventHandler.onMouseOut(prevFigure);
            }
            if (nowFig) {
                this.prevFigure = nowFig;
                if (nowFig.eventHandler)
                    nowFig.eventHandler.onMouseOver(nowFig);
            }
        }
    }

    onMouseOut(e: MouseEvent, canvas: HTMLCanvasElement): void {
        // すべて音を消す
        for (let i = this.figures.length - 1; i >= 0; --i) {
            const fig = this.figures[i];
            if (fig.eventHandler)
                fig.eventHandler.onMouseUp(fig);
        }
        this.prevFigure = null;
    }
}
