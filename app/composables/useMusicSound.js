import { Howl } from 'howler';

const musicTracks = [
    '/music/background/celestial-pulse-231444.mp3',
    '/music/background/edge-of-the-world-219742.mp3',
    '/music/background/flex-hustle-233015.mp3',
    '/music/background/green-sky-125179.mp3',
    '/music/background/heart-in-lights-219739.mp3',
    '/music/background/lighthouse-219743.mp3',
    '/music/background/roaming-the-desert-with-brendan-fraser-219729.mp3',
    '/music/background/the-path-untrodden-219745.mp3',
    '/music/background/unknown-realm-147409.mp3'
];

let musicSound = null;
let currentTrackIndex = 0;

export const useMusicSound = () => {
    const isPlaying = useState('music-is-playing', () => false);
    const initSound = () => {
        if (musicSound) {
            musicSound.unload();
        }

        musicSound = new Howl({
            src: [musicTracks[currentTrackIndex]],
            loop: false,
            html5: true,
            onend: () => {
                isPlaying.value = false;
                console.log("Hudba dohrála, přehrávám další stopu: ", musicTracks[currentTrackIndex]);
                currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
                initSound();
                musicSound.play();
                isPlaying.value = true;
            }
        });
    };

    const play = () => {
        if (!musicSound) {
            initSound();
        }
        
        console.log("Přehrávám hudbu");
        isPlaying.value = true;
        musicSound?.play();
    };

    const stop = () => {
        console.log("Zastavuji hudbu");
        isPlaying.value = false;
        musicSound?.stop();
    };

    return {
        play,
        stop,
        isPlaying
    };
};