import { Howl } from 'howler';
let clickSound = null;
export const useClickSoundNext = () => {
  //const volume = useState('settings-volume', () => 0.5);
  if (!clickSound) {
    clickSound = new Howl({
      src: ['/music/clicksound/pluck_002.ogg'],
      html5: true
    });
  }

  const play = () => {
    clickSound?.play();
  };
  return {
    play
  };
}