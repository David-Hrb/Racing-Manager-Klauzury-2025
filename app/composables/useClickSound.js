import { Howl } from 'howler';
let clickSound = null;
export const useClickSound = () => {
  //const volume = useState('settings-volume', () => 0.5);
  if (!clickSound) {
    clickSound = new Howl({
      src: ['/music/clicksound/select_007.ogg'],
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