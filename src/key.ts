import { Figure, EventHandler } from "./figure";

// 鍵盤
export class Key extends Figure {
    note: number;

    hz() {
        return  440.0 * 2 ** (this.note / 12);
    }

    constructor(x: number, y: number, width: number, height: number, color: string,
        note: number, eventHandler: EventHandler<Figure>) {
            super(x, y, width, height, color, eventHandler)
            this.note = note;
        }
}
