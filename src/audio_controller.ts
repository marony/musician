import { Figure, EventHandler } from "./figure";
import { Audio } from './audio';

class Note {
    note: number;
    private oscillator: OscillatorNode | null = null;

    constructor(note: number) {
        this.note = note;
    }

    play(controller: AudioController) {
        const hz = 440.0 * 2 ** (this.note / 12);

        const audio = new Audio();
        let gain = audio.createGain()
        let oscillator = audio.createOscillator();
        oscillator.type = 'sawtooth';
        audio.connectDestination(gain);
        oscillator.connect(gain);
        oscillator.frequency.value = hz;

        oscillator.start(0);
        this.oscillator = oscillator;
    }

    stop(controller: AudioController) {
        const oscillator = this.oscillator;
        if (!oscillator) {
            return;
        }
        this.oscillator = null;

        window.setTimeout(() => oscillator.stop(), 200);
    }
}

// UIと音声の橋渡し
export class AudioController implements EventHandler<Figure> {
    notes: Note[] = [];

    onMouseDown(fig: Figure): void {
        console.log(`onMouseDown: ${fig.note}`);
        const index  = this.notes.findIndex((n) => fig.note == n.note)
        if (index >= 0) {
            // 既に鳴っているので何もしない
            return;
        }
        // 音を鳴らす
        const note = new Note(fig.note);
        this.notes.push(note);
        note.play(this);
    }

    onMouseUp(fig: Figure): void {
        const index  = this.notes.findIndex((n) => fig.note == n.note)
        console.log(`onMouseUp: ${fig.note}, ${index}`);
        if (index < 0) {
            // 鳴ってないので何もしない
            return;
        }
        // 音を止める
        const note = this.notes[index];
        note.stop(this);
        this.notes.splice(index, 1);
    }

    onMouseOver(fig: Figure): void {
        console.log(`onMouseOver: ${fig.note}`);
        this.onMouseDown(fig);
    }

    onMouseOut(fig: Figure): void {
        console.log(`onMouseOut: ${fig.note}`);
        this.onMouseUp(fig);
    }
}
