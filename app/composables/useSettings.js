const STORAGE_KEY = 'audio-settings';

const volume = ref(100);
let initialized = false;

export function useSettings() {
  
  if (process.client && !initialized) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        volume.value = data.volume;
      }
    } catch (error) {
      console.error('Chyba při načítání nastavení:', error);
    }
    
    initialized = true;
  }
  if (process.client) {
    watch(volume, (newVolume) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ volume: newVolume }));
      } catch (error) {
        console.error('Chyba při ukládání nastavení:', error);
      }
    });
  }
  return {
    volume
  };
}