const toast = new Toast(".toast");
const compat = new Compat();

const LANGUAGES = {
    "en": "English",
    "de": "Deutsch",
    "es": "Español",
    "fr": "Français",
    "it": "Italiano",
    "ja": "日本語",
    "pt": "Português",
    "ru": "Русский",
    "zh": "中文"
};

document.addEventListener('DOMContentLoaded', function () {
    const languageSelect = document.getElementById('language');
    Object.entries(LANGUAGES).forEach(([value, lang]) => {
        let opt = document.createElement('option');
        opt.value = value;
        opt.innerHTML = lang;
        languageSelect.appendChild(opt);
    });
    languageSelect.value = settings.language;
    languageSelect.onchange = (event) => {
        let value = event.target.value;
        settings.language = event.target.value;
    };

    // Offline mode checkbox
    if (!settings.offlineDocPath) {
        // If the offline doc path not exists, turn off the offline mode.
        settings.isOfflineMode = false;
    }
    const offlineModeCheckbox = document.getElementById('offline-mode');
    const checkedState = settings.isOfflineMode;
    offlineModeCheckbox.checked = checkedState;
    toggleOfflinePathEnableState(checkedState);
    offlineModeCheckbox.onchange = function (event) {
        const checked = event.target.checked;
        settings.isOfflineMode = checked;
        toggleOfflinePathEnableState(checked);
    };

    // Offline doc path
    const offlineDocPath = document.querySelector('.offline-doc-path');
    offlineDocPath.value = settings.offlineDocPath;
    offlineDocPath.onchange = function (event) {
        let path = event.target.value;
        if(compat.browserType() === 'firefox' && (path.startsWith('/') || path.startsWith('file://')) ) {
            toast.error("Sorry, Firfox doesn't support `file://` Proto, you can use http server instead.")
            toast.dismiss(5000);
            return;
        }

        // Check the std doc path validity
        if (settings.checkDocPathValidity(path)) {
            settings.offlineDocPath = path;
            toast.success("Great! Your local doc path is valid!");
        } else {
            // If the offline doc path is invalid, turn off the offline mode.
            offlineModeCheckbox.checked = false;
            toast.error("Invalid local doc path.");
        }
        toast.dismiss(3000);
    };
}, false);


function toggleOfflinePathEnableState(enable) {
    const offlineDocPath = document.querySelector('.offline-doc-path');
    if (enable) {
        offlineDocPath.classList.remove('disable');
        offlineDocPath.classList.add('enable');
    } else {
        offlineDocPath.classList.remove('enable');
        offlineDocPath.classList.add('disable');
    }
}