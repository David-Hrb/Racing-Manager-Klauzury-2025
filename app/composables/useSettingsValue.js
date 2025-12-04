export function useSettingsValue() {
    const settingsval = useState('settings-modal', () => false);
    
    const toggle = () => {
        settingsval.value = !settingsval.value;
    };
    
    return {
        settingsval,
        toggle
    };
}