import { Howl } from 'howler';
export const useSoundSettings = () => {
    console.log("useSoundSettings loaded");
    const soundsettings = (volumenum) => {
        Howler.volume(volumenum);
    }

    return { soundsettings };
}