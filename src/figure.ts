export interface EventHandler<T> {
    onMouseDown(target: T): void;
    onMouseUp(target: T): void;
    onMouseOver(target: T): void;
    onMouseOut(target: T): void;
}

// Canvasに描く図形
export class Figure {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;

    note: number;

    eventHandler: EventHandler<Figure>

    hz() {
        return  440.0 * 2 ** (this.note / 12);
     }

    constructor(x: number, y: number, width: number, height: number, color: string,
        note: number, eventHandler: EventHandler<Figure>) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        this.note = note;

        this.eventHandler = eventHandler;
    }

    paint(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    isIn(x: number, y: number): boolean {
        return (this.x <= x && x < this.x + this.width) &&
            (this.y <= y && y < this.y + this.height);
    }
}
