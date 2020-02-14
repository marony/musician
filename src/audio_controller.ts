import { Figure, EventHandler } from "./figure";
import { Audio } from './audio';

// UIと音声の橋渡し
export class AudioController implements EventHandler<Figure> {
    onMouseDown(fig: Figure): void {
        this.play(fig);
    }

    onMouseUp(fig: Figure): void {
    }

    onMouseOver(fig: Figure): void {
    }

    onMouseOut(fig: Figure): void {
    }

    private play(fig: Figure): void {
        const d = fig.note;
        console.log('note = ' + d);
        const hz = 440.0 * 2 ** (d / 12);

        const audio = new Audio();
        let gain = audio.createGain()
        let oscillator1 = audio.createOscillator();
        oscillator1.type = 'sawtooth';
        let oscillator2 = audio.createOscillator();
        oscillator2.type = 'triangle';
        audio.connectDestination(gain);
        oscillator1.connect(gain);
        oscillator1.frequency.value = hz;
        oscillator2.connect(gain);
        oscillator2.frequency.value = hz;

        oscillator1.start(0);
        oscillator2.start(0);
        window.setTimeout(() => { oscillator1.stop(); oscillator2.stop(); }, 1000);
    }
}
